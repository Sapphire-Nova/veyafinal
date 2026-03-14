import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

Deno.serve(async (req) => {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { user_email, credits } = session.metadata || {};

      if (!user_email || !credits) {
        console.error("Missing metadata in session:", session.id);
        return Response.json({ received: true });
      }

      const creditsToAdd = parseInt(credits, 10);

      const base44 = createClientFromRequest(req);

      // Find or create LunaCredit record for this user
      const existing = await base44.asServiceRole.entities.LunaCredit.filter({ user_email });

      if (existing && existing.length > 0) {
        const record = existing[0];
        await base44.asServiceRole.entities.LunaCredit.update(record.id, {
          balance: (record.balance || 0) + creditsToAdd,
          total_purchased: (record.total_purchased || 0) + creditsToAdd,
        });
      } else {
        await base44.asServiceRole.entities.LunaCredit.create({
          user_email,
          balance: creditsToAdd,
          total_purchased: creditsToAdd,
          total_spent: 0,
        });
      }

      console.log(`Added ${creditsToAdd} Luna Credits to ${user_email}`);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
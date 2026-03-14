import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

const PACKS = {
  starter: { priceId: "price_1TAjDrGYFqeHnmMadvxAoGDK", credits: 10 },
  moon:    { priceId: "price_1TAjDrGYFqeHnmMaqadbhMDr", credits: 25 },
  priestess: { priceId: "price_1TAjDrGYFqeHnmManRhY1JqW", credits: 60 },
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pack, successUrl, cancelUrl } = await req.json();

    if (!PACKS[pack]) {
      return Response.json({ error: "Invalid pack" }, { status: 400 });
    }

    const { priceId, credits } = PACKS[pack];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: user.email,
      metadata: {
        base44_app_id: Deno.env.get("BASE44_APP_ID"),
        user_email: user.email,
        credits: String(credits),
        pack,
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
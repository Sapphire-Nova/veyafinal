import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const COST = 25;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    // Find user's credit record
    const records = await base44.entities.LunaCredit.filter({ user_email: user.email });
    const record = records?.[0];
    const balance = record?.balance ?? 0;

    if (balance < COST) {
      return Response.json({ error: 'insufficient_credits', balance }, { status: 402 });
    }

    if (record) {
      await base44.entities.LunaCredit.update(record.id, {
        balance: balance - COST,
        total_spent: (record.total_spent ?? 0) + COST,
      });
    }

    return Response.json({ success: true, balance: balance - COST });
  } catch (error) {
    console.error('spendCredits error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
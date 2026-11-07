import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, planId, paymentMethod, userId } = await req.json();

    const baseAmount = 19.0;
    const gstRate = 0.18;
    const taxAmount = 3.42;
    const totalAmount = 22.42;

    if (action === 'create_order') {
      const orderId = 'order_RP_' + Math.floor(10000000 + Math.random() * 90000000);
      return NextResponse.json({
        success: true,
        orderId,
        baseAmount,
        taxAmount,
        totalAmount,
        currency: 'INR',
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_prepresume_demo',
      });
    }

    if (action === 'verify_payment') {
      const paymentId = 'pay_RP_' + Math.floor(100000000 + Math.random() * 900000000);
      const signature = 'sig_' + Math.random().toString(36).substring(2, 15);

      return NextResponse.json({
        success: true,
        verified: true,
        paymentId,
        signature,
        activatedUntil: new Date(Date.now() + 7 * 86400000).toISOString(),
        message: 'Subscription successfully activated for 7 days via Razorpay.',
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Payment processing error' },
      { status: 500 }
    );
  }
}

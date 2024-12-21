import { NextApiHandler, PageConfig } from "next";
import { Readable } from "stream";
import Stripe from "stripe";

async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }

const stripeWebhook: NextApiHandler = async (req, res) =>{
    const slugs = await buffer(req);
    const signature = req.headers["stripe-signature"];

    const stripeKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; 
    if(!stripeKey){
        res.status(500).json({message: `Missing STRIPE_SECRET_KEY!`});
        return;
    }
    if(!webhookSecret){
        res.status(500).json({message: `Missing STRIPE_WEBHOOK_SECRET!`});
        return;
    }
    const stripe = new Stripe(stripeKey, {apiVersion: "2024-10-28.acacia"})
    const event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
    )

    switch (event.type) {
        case 'checkout.session.completed':
          // Handle successful payment
          break;
        case 'invoice.payment_succeeded':
          // Handle successful subscription payment
          break;
        // Add more cases for other event types you want to handle
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      res.status(200).json({ received: true });
}

export const config: PageConfig = {
    api:{
        bodyParser: false,
    },
};
import { NextApiHandler } from "next";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; 
const stripeWebhook: NextApiHandler = (req, res) => {
        const event = req.body;      
        // Handle the event
        console.log(req.body);
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; 

        if (req.method === 'POST') {
            const buf = req;  // Pobieramy raw body
            const sig = req.headers['stripe-signature'];  // Nagłówek podpisu Stripe
        
            let event;
        
            try {
              // Weryfikacja podpisu webhooka
              event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            } catch (err) {
              console.error('Webhook error:', err);
              return res.status(400).send({message: JSON.stringify(err.message)});
            }
        
            // Obsługuje różne typy zdarzeń
            switch (event.type) {
              case 'payment_intent.succeeded':
                const paymentIntent = event.data.object; // Zawiera szczegóły płatności
                console.log(`PaymentIntent was successful!`, paymentIntent);
                break;
              case 'payment_intent.payment_failed':
                const paymentFailed = event.data.object;
                console.log(`PaymentIntent failed!`, paymentFailed);
                break;
              case 'checkout.session.completed':
                const session = event.data.object;
                console.log(`Checkout session completed!`, session);
                break;
              default:
                console.log(`Unhandled event type ${event.type}`);
            }
            // Potwierdzamy odbiór eventu
            res.status(200).json({ received: true });
          } else {
            res.status(405).send('Method Not Allowed');
          }    
    res.status(204).end()
}

export default stripeWebhook;
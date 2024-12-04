import { GetProductsBySlugsDocument, GetProductsBySlugsQuery, GetProductsBySlugsQueryVariables } from "@/generated/graphql";
import { apolloClient } from "@/graphql/appolloClient";
import { NextApiHandler } from "next";
import Stripe from "stripe";

const checkoutHandler: NextApiHandler = async (req, res) =>{
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if(!stripeKey){
        res.status(500).json({message: `Missing STRIPE_SECRET_KEY!`});
        return;
    }

    const slugs = req.body
    const itemsSlugs = slugs.map((cartItem)=> {
        return Object.keys(cartItem)[0]
    })
  
    const { data } = await apolloClient.query<GetProductsBySlugsQuery, GetProductsBySlugsQueryVariables>({
        query: GetProductsBySlugsDocument,
        variables: {
            "slugs": itemsSlugs
          }
    })
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; 

    const stripe = new Stripe(stripeKey, {apiVersion: "2024-10-28.acacia"})
    const dataToStripe = data.products.map((product, i) => {
        return {
            price_data: {
                currency: "PLN",
                unit_amount: product.price * 100,
                product_data: {
                    name: product.name,
                },
            },
            quantity: slugs[i][product.slug],
        };
    });
 
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        locale: "pl",
        payment_method_types: ["p24", "card"],
        success_url: `${process.env.BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
        line_items: dataToStripe,
});


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
    res.status(201).json({ session: stripeCheckoutSession})
};



export default checkoutHandler;
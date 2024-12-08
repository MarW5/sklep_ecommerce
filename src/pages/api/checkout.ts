import { GetProductsBySlugsDocument, GetProductsBySlugsQuery, GetProductsBySlugsQueryVariables } from "@/generated/graphql";
import { apolloClient } from "@/graphql/appolloClient";
import { NextApiHandler } from "next";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(stripeKey, {apiVersion: "2024-10-28.acacia"})
const checkoutHandler: NextApiHandler = async (req, res) =>{
    if(!stripeKey){
        res.status(500).json({message: `Missing STRIPE_SECRET_KEY!`});
        return;
    }

    if (req.method === "POST") {
        const slugs = req.body
        const itemsSlugs = slugs.map((cartItem: {})=> {
            return Object.keys(cartItem)[0]
        })
        const { data } = await apolloClient.query<GetProductsBySlugsQuery, GetProductsBySlugsQueryVariables>({
            query: GetProductsBySlugsDocument,
            variables: {
                "slugs": itemsSlugs
              }
        })
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
        res.status(201).json({ session: stripeCheckoutSession})
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

export default checkoutHandler;
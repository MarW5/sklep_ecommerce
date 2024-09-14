import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { FormContent } from "./FormContent";
import { CheckoutFormType } from "@/utils/formValidator";
import { CreateOrderMutation, useCreateOrderMutation } from '@/generated/graphql';

import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "@/utils/formValidator";

export const CheckoutForm = ():CheckoutFormType => {
    const handeFormMethod = useForm<CheckoutFormType>({resolver: yupResolver(checkoutSchema)});

    const [createOrder, {data, loading, response}] = useCreateOrderMutation();
    const handleAddReview = (orderData:CreateOrderMutation) => {
        createOrder({
            variables: {
            order: {
                    email: "exemple@onet.pl",
                    total: 9998,
                    orderItems: {
                      create: [{
                        quantity: 2,
                        total: 1905,
                        product: {
                          connect: 
                            {        
                                id: "ckdu4ch1s0h1s01580ksoy6m5"
                            }
                          
                          }
                      }]
                      }
                // review: {...orderData}
            }
        }
        })
    }

    const handleSubmitEvent = (orderData:CheckoutFormType) =>{
        handleAddReview(orderData)
    }
        return (
            <button onClick={()=> handleSubmitEvent()} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
        )
}


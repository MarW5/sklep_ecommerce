import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "./FormComponents/FormInput";
import { FormContent } from "./FormComponents/FormContent";
import { OrderFormType, orderSchema } from "@/utils/formValidator";
import { useCreateOrderMutation } from "@/generated/graphql";
import { useCartState } from "./Cart/CartContext";
import { setCartItemsToStorage } from "./Cart/cartModel";

export const OrderForm = () => {
    const cartState = useCartState();
    const formVariables = useForm<OrderFormType>({resolver: yupResolver(orderSchema)});
    const [createOrder, {data, loading, error}] = useCreateOrderMutation();
    const handleAddReview = (orderData:CreateOrderMutation) => {
        createOrder({
            variables: {
            order: {...orderData}
        }
        })
    }
    const handleSendOrder:SubmitHandler<OrderFormType> = (data) => {
        if(!data) {
            return;
        }

        const orderProducts = cartState.items.map((item)=>{
            return {
                quantity: item.count,
                total: item.count * item.price,
                product: {
                    connect: {
                        id: item.uuId
                    }
                }
            }
        })
        const orderData = {
            email: data.email,
            total: 5000,
            orderItems: {
                create: [...orderProducts]
            }
        }
        handleAddReview(orderData)
    }
    useEffect(()=>{
            if(data !== undefined){
                cartState.clearCart()
                setCartItemsToStorage([])
            }
    }, [data])
    
    return (
        <div>
            {data ? <p>Zamówienie zostało przyjęte do realizacji</p> :
            <FormContent formVariables={formVariables} handleSubmitHandle ={handleSendOrder} >
                <FormInput label='Email address' name="email" />
                <button onClick={()=> handleSendOrder()} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </FormContent>
            }
            
        </div>
    )
}
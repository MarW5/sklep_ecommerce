import React from "react";
import { useCartState } from "./Cart/CartContext";
import { ProductsSummary } from "./ProductSummary";

export const OrderSummary = () =>{
    const cartState = useCartState();

    return (
        <ul className="divide-y divide-gray-200">
            {cartState.items.map((item, index) => (
                <ProductsSummary product={item} productIndex={index} />
            ))}
         </ul>
    )
}
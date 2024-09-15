import React, {ReactNode} from "react";
import Image from "next/image";
import { CartItem } from "./Cart/CartContext";

export const ProductsSummary = ({children = null, product, productIndex}: { children: ReactNode , product: CartItem, productIndex: number}) => {
    return (
        <li key={`${product.title}_${productIndex}`}>
        <div className="flex justify-around p-1">
            <div className="w-4/12 flex">
                <Image
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    width={100}
                    height={150}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="w-6/12 flex justify-between">
                <div>
                    <div>{product.title}</div>
                    <div>Ilość: {product.count}</div>
                    <div>{product.count*product.price}</div>
                    <div>Rozmiar</div>
                    <div>Kolor</div>
                </div>
                {children ? children : null}
            </div>
        </div>
    </li>
    )
}
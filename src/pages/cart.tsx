import { useCartState } from "@/components/Cart/CartContext";
import { ProductsSummary } from "@/components/ProductSummary";
import Link from "next/link";

export const CartContent = () => {
    const cartState = useCartState();
    return (
        <div className="col-span-2">
            <ul className="divide-y divide-gray-200">
                {cartState.items.map((item, index) => (
                    <ProductsSummary product={item} productIndex={index}>
                        <CartRemoveButton itemId={item.id}/>
                    </ProductsSummary>         
                ))}
            </ul>
        </div>
    )
}

export const CartSummary = () => {
    const cartState = useCartState();
    const sumPrices =()=>{
        let sumFinal = 0
        cartState.items.forEach((el)=>{
             sumFinal += el.price * el.count
        })
        return sumFinal
    }
    
    return (
        <div className="flex flex-col w-full">
            <p className="divide-y divide-gray-200">Zamów</p>
            <div className="font-bold w-full text-lg">Suma:{sumPrices()}</div>
            <Link href={`/order`} className="text-white text-sm bg-slate-800 rounded-md p-2 mt-1 max-w-fit">
                Przejdź do koszyka
            </Link>
        </div>
    )
}

const CartPage = () => {
    return (
        <div className="max-w-2xl mx-auto w-full p-4">
            <p>Koszyk</p>
            <div className="grid grid-cols-3 gap-8">
                <CartContent />
                <CartSummary />
            </div>
        </div>
    )
}

const CartRemoveButton = ({ itemId }) =>{
    const cartState = useCartState();
    return (
        <button className="flex" onClick={()=>cartState.removeItemFromCart(itemId)}>
        <svg className="w-5 h-5 ml-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
        </svg>
    </button>
    )
}

export default CartPage;
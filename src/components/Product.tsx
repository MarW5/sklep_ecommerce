import Link from "next/link";
import Image from "next/image";
import { ProductDetailsType } from './ProductDetails'
import { useCartState } from "./Cart/CartContext";

type ProductListItem = Pick<ProductDetailsType, "id" | "title" | "price" | "thumbnailUrl" | "thumbnailAlt">

interface ProductType {
    data: ProductListItem
}

export const Product = ({ data }: ProductType) => {
    const { id, title, price, thumbnailAlt, thumbnailUrl } = data;
    const cartState = useCartState();
    return (
        <>
            <div className="group relative">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                        src={thumbnailUrl}
                        alt={thumbnailAlt}
                        width={200}
                        height={300}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div className="flex flex-col justify-end">
                        <h3 className="text-sm text-gray-700 p-1">
                            <Link href={`/products/${id}`}>
                                <span aria-hidden="true" className="absolute inset-0 max-h-80" />
                                {title}
                            </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 p-1">Kolor: czarny</p>
                    </div>
                    <div className="flex flex-col justify-end">
                        <p className="text-sm font-medium text-gray-900 p-1">Cena: {price}</p>
                        <button onClick={() => {
                            cartState.addItemToCart({
                                id: id,
                                price: price,
                                title: title,
                                imageUrl:thumbnailUrl,
                                imageAlt:thumbnailAlt,
                                count: 1,
                            })
                        }} className='text-white text-sm bg-slate-800 rounded-md p-1 mt-1 max-w-fit'>
                            Dodaj do koszyka
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
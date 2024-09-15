import Image from "next/image";
import { Rating } from "@/components/Rating";
import Markdown from 'react-markdown';
import { useCartState } from "./Cart/CartContext";

export interface ProductDetailsType {
    id: string;
    uuId: string;
    title: string;
    price:number;
    description: string;
    thumbnailAlt: string,
    thumbnailUrl: string,
    rating: number
}
interface ProductType {
    data: ProductDetailsType
}

export const ProductDetails = ({ data }: ProductType) => {
    const { id, uuId, title, description, price, thumbnailUrl, thumbnailAlt, rating } = data;
    const cartState = useCartState();

    return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                <Image
                        src={thumbnailUrl}
                        alt={thumbnailAlt}
                        width={400}
                        height={700}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                <div className="flex flex-col">
                    <h2>{title}</h2>
                        <article className="prose lg:prose-xl">
                            <Markdown>{description}</Markdown>
                        </article>
                    <Rating rating={rating} />
                    <div>Rozmiar</div>
                    <div>Kolor</div>
                    <button onClick={() => {
                                cartState.addItemToCart({
                                    id: id,
                                    uuId: uuId,
                                    price: price,
                                    title: title,
                                    count: 1,
                                })
                            }} className='text-white text-sm bg-slate-800 rounded-md p-1 mt-1 max-w-fit'>
                                Dodaj do koszyka
                    </button>
                </div>  
        </div>
    )
}


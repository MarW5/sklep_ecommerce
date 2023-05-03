import Link from "next/link";
import Image from "next/image";
import { ProductDetails } from './ProductDetails'

type ProductListItem = Pick<ProductDetails, "id" | "title" | "thumbnailUrl" | "thumbnailAlt">

interface ItemType {
    data: ProductListItem
}

export const Items = ({ data }: ItemType) => {
    const { id, title, thumbnailAlt, thumbnailUrl } = data;
        
    return (
        <article key={id} className="static h-full ">
            <Link className="w-100 h-full" href={`/items/${id}`}>
                <div className="w-64 h-80 relative">
                    <Image
                        src={thumbnailUrl}
                        alt={thumbnailAlt} 
                        fill
                    />
                </div>
                <h2 className="underline decoration-1 text-bold antialiased font-semibold">{title}</h2>
                </Link>
        </article>
    )
}
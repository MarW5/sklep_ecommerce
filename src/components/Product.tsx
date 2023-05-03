import Link from "next/link";
import Image from "next/image";
import { ProductDetails } from './ProductDetails'

type ProductListItem = Pick<ProductDetails, "id" | "title" | "thumbnailUrl" | "thumbnailAlt">

interface ProductType {
    data: ProductListItem
}

export const Product = ({ data }: ProductType) => {
    const { id, title, thumbnailAlt, thumbnailUrl } = data;
    return (
        <article className="group">
            <Link href={`/products/${id}`}>
                <div className="w-64 h-80 relative">
                    <Image
                        src={thumbnailUrl}
                        alt={thumbnailAlt} 
                        fill
                    />
                </div>
                <h2>{title}</h2>
            </Link>
        </article>
    )
}
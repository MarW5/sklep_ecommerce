import Link from "next/link";
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
                <img className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]" src={thumbnailUrl} alt={thumbnailAlt}></img>
                <h2>{title}</h2>
            </Link>
        </article>
    )
}
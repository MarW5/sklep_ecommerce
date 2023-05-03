import Image from "next/image";
import { Rating } from "@/components/Rating";
export interface ProductDetailsType {
    id: string;
    title: string;
    description: string;
    thumbnailAlt: string,
    thumbnailUrl: string,
    rating: number
}
interface ProductType {
    data: ProductDetailsType
}

export const ProductDetails = ({ data }: ProductType) => {
    const { title, description, thumbnailUrl, thumbnailAlt, rating } = data;
    return (
        <div>
            <div className="p-4">
                <Image
                        src={thumbnailUrl}
                        alt={thumbnailAlt} 
                        fill
                    />
                <h2>{title}</h2>
                <div className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {description}</div>
                <Rating rating={rating} />
            </div>
        </div>
    )
}


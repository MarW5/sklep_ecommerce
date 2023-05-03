import Image from "next/image";
import { Rating } from "@/components/Rating";
export interface ProductDetailsType {
    id: string;
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
    const { title, description, price, thumbnailUrl, thumbnailAlt, rating } = data;
    return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
            <div className="p-4 relative">
                <Image
                        src={thumbnailUrl}
                        alt={thumbnailAlt}
                        width={400}
                        height={700}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
            
            </div>
            <div>
            <h2>{title}</h2>
                <div className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {description}</div>
                <Rating rating={rating} />
            </div>
        </div>
    )
}


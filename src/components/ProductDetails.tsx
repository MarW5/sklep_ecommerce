import { Rating } from "@/components/Rating";
export interface ProductDetails {
    id: number;
    title: string;
    description: string;
    thumbnailAlt: string,
    thumbnailUrl: string,
    rating: number,
}
interface ProductType {
    data: ProductDetails
}

export const ProductDetails = ({ data }: ProductType) => {
    const { title, description, thumbnailUrl, thumbnailAlt, rating } = data;
    return (
        <div>
            <div className="p-4">
                <img className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]" src={thumbnailUrl} alt={thumbnailAlt}></img>
                <h2>{title}</h2>
                <div className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {description}</div>
                <Rating rating={rating} />
            </div>
        </div>
    )
}


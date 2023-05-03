import Link from "next/link";
import Image from "next/image";
import { ProductDetailsType } from './ProductDetails'

type ProductListItem = Pick<ProductDetailsType, "id" | "title" | "price" | "thumbnailUrl" | "thumbnailAlt">

interface ProductType {
    data: ProductListItem
}

export const Product = ({ data }: ProductType) => {
    const { id, title, price, thumbnailAlt, thumbnailUrl } = data;
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
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <a href={`/products/${id}`}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {title}
                            </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Kolor: czarny</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{price}</p>
                </div>
            </div>
        </>
    )
}
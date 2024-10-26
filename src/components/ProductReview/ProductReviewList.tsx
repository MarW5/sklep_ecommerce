import { useGetReviewsForProductSlugQuery } from "@/generated/graphql";
import { ProductReviewItem } from "./ProductReviewItem";
interface ProductReviewListProps {
    productSlug: string;
}

export const ProductReviewList = ({ productSlug }: ProductReviewListProps) => {
    const { data, loading, error} = useGetReviewsForProductSlugQuery({
        variables: {
            slug: productSlug
        }
    })

    return (
    <ul className="flex flex-col">
        {data?.product?.reviews.map(review => <ProductReviewItem key={review.id} review={review} />)}
    </ul>
    );
}
 
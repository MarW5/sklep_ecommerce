import { GetReviewsForProductSlugQueryVariables, useGetReviewsForProductSlugQuery } from "@/generated/graphql";
import { ProductReviewItem } from "./ProductReviewItem";

export const ProductReviewList = ({ slug }: GetReviewsForProductSlugQueryVariables) => {
    const { data, loading, error} = useGetReviewsForProductSlugQuery({
        variables: {slug},
    })
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Aktualnie nie można wyświetlić opini produktu.</div>;

    return (
    <ul className="flex flex-col">
        {data?.product?.reviews.map(review => <ProductReviewItem key={review.id} review={review} />)}
    </ul>
    );
}
 
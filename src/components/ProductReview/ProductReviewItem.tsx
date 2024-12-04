import { GetReviewsForProductSlugQuery } from "@/generated/graphql";

type Review = NonNullable<GetReviewsForProductSlugQuery['product']>['reviews'][0];

export const ProductReviewItem = ({ review }:{ review: Review }) => {
    return ( 
        <li key={review.id} className="flex flex-col border-indigo-400 border border-dashed p-4 m-2">
            <div className="text-lg font-bold">{review.headline}</div>
            <div>{review.content}</div>
            <div className="flex">
                <div className="flex font-bold">{review.rating}<p className="pl-1">/ 5</p></div>
                <div className="pl-3">{review.name}</div>
            </div>
        </li>
     );
}
 
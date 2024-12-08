import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetReviewsForProductSlugDocument, GetReviewsForProductSlugQuery, ReviewCreateInput, useCreateProductReviewMutation } from "@/generated/graphql";

import { Main } from "@/components/Main";
import { FormContent } from "@/components/FormContent";
import { FormInput } from "@/components/FormInput";
import { RatioFormType, ratioFormSchema } from "@/utils/formValidator";
import { useSession } from "next-auth/react"

export const ProductReviewForm = ({ productId }) => {
    const formVariables = useForm<RatioFormType>({resolver: yupResolver(ratioFormSchema)});
    const { data: session } = useSession();
    const [createReview, {data, loading}] = useCreateProductReviewMutation({
        update(cache, result) {
            const originalReviewsQuery =
            cache.readQuery<GetReviewsForProductSlugQuery>({
                query: GetReviewsForProductSlugDocument,
                variables: { slug: productId },
            });
            if(!originalReviewsQuery?.product?.reviews || !result.data?.review ) {
                return;
            }
    
            const newReviewsQuery = {
                ...originalReviewsQuery,
                product: {
                    ...originalReviewsQuery.product,
                    reviews: [
                        ...originalReviewsQuery.product?.reviews,
                        result.data.review,
                    ]
                }
            }
            cache.writeQuery({
                query: GetReviewsForProductSlugDocument,
                variables: {slug: productId},
                data: newReviewsQuery,
            })
        },
        context: {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
            },
        },
    });
    const handleAddReview = (ratioData:ReviewCreateInput) => {
        createReview({
            variables: {
                review: {
                    ...ratioData,
                    product: {
                        connect: {
                            slug: productId
                        }
                    }
                }
            },
            optimisticResponse: {
                __typename: "Mutation",
                review: {
                    __typename: "Review",
                    id: (-Math.random()).toString(32),
                    ...ratioData,
                }
            }
        })
    }

    const handleSubmitEvent = (ratioData:ReviewCreateInput) =>{
        handleAddReview(ratioData)
    }
    if (!session) {
        return <div>Musisz być zalogowany, aby dodać opinię.</div>;
    }
    return (
        <Main>
             <FormContent formVariables={formVariables}  handleSubmitHandle ={handleSubmitEvent} classes="flex flex-col border border-2 align-center justify-center w-full">
                <FormInput label='Tytuł' name="headline" classes='w-6/12 justify-center' />
                <FormInput label='Imię' name="name" classes='w-6/12 justify-center'/>
                <FormInput label='Adres email' name="email" classes='w-6/12 justify-center' />
                <FormInput label='Opinia' name="content" classes='w-6/12 justify-center' />
                <FormInput label='Ocena' name="rating" classes='w-6/12 justify-center'/>
                <div className="flex justify-center">
                    <button className="w-48 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Wyślij</button>
                </div>
            </FormContent>
        </Main>
    ) 
}
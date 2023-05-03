import { Main } from "@/components/Main";
import { ProductDetails } from "@/components/ProductDetails";
import { GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables, GetProductsSlugsQuery, GetProductsSlugsDocument, GetProductDetailsBySlugDocument } from "@/generated/graphql";
import { apolloClient } from "../../graphql/appolloClient";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

const ProductIdPage = ({ data, }: InferGetStaticPropsType<typeof getStaticProps>) => {

    if (!data) {
        console.log(data)
        return <div>Nie działa</div>
    }
    return (
            <Main>
                <ProductDetails
                    data={{
                        id: data.slug,
                        title: data.name,
                        description: data.description,
                        thumbnailUrl: data.images[0].url,
                        thumbnailAlt: data.name,
                        rating: 5
                    }} />
            </Main>
    )
}
export default ProductIdPage;

export const getStaticPaths = async () => {

    const { data } = await apolloClient.query<GetProductsSlugsQuery>({
        query: GetProductsSlugsDocument,
    })

    return {
        paths: data.products.map((product) => {
            return {
                params: {
                    productId: product.slug,
                },
            }
        }),
        fallback: false,
    }

}

export const getStaticProps = async ({ params, }: GetStaticPropsContext<{ productId: string }>) => {
    if (!params?.productId) {
        return {
            props: {},
            notFound: true
        }
    }
    const { data } = await apolloClient.query<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>({
        variables: {
            slug: params.productId
        },
        query: GetProductDetailsBySlugDocument,
    })

    if(!data.product) {
        return {
            props:{},
            notFound: true,
        };
    }

    return {
        props: {
            data: {
                ...data.product,
            }
        },
    };
};
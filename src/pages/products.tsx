import { Product } from "@/components/Product"
import { InferGetStaticPropsType } from "next";
import { apolloClient } from '../graphql/appolloClient';
import { GetProductListDocument, GetProductListQuery } from "@/generated/graphql";

const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
            <div className="m-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {data.products.map((product) => {
                    return (
                            <Product key={product.id} data={{
                                id: product.slug,
                                uuId: product.id,
                                title: product.name,
                                price: product.price,
                                thumbnailUrl: product.images[0].url,
                                thumbnailAlt: product.name,
                            }} />
                    );
                })}
            </div>
    )
}

export const getStaticProps = async () => {
    const { data } = await apolloClient.query<GetProductListQuery>({
    query: GetProductListDocument,
  })
    return {
        props: {
            data,
        },
    };
};

export default ProductsPage;
import { Product } from "@/components/Product"
import { InferGetStaticPropsType } from "next";
import { apolloClient } from '../graphql/appolloClient';
import { GetProductListDocument, GetProductListQuery } from "@/generated/graphql";

const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
            <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 ">
                {data.products.map((product) => {
                    return (
                        <li key={product.id}>
                            <Product data={{
                                id: product.slug,
                                title: product.name,
                                thumbnailUrl: product.images[0].url,
                                thumbnailAlt: product.name,
                            }} />
                        </li>
                    );
                })}
            </ul>
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
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Product } from "@/components/Product"
import { InferGetStaticPropsType } from "next";

const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <>
            <Header />
            <Main>
                <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 ">
                    {data.map((product) => {
                        return (
                            <li key={product.id}>
                                <Product data={{
                                    id: product.id,
                                    title: product.title,
                                    thumbnailUrl: product.image,
                                    thumbnailAlt: product.title,
                                }} />
                            </li>
                        );
                    })}
                </ul>
            </Main>
            <Footer />
        </>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/`);
    const data: StoreApiResponse[] = await res.json();

    return {
        props: {
            data,
        },
    };
};

interface StoreApiResponse {
    id: number;
    title: string
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}

export default ProductsPage;
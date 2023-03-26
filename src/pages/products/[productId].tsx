import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { ProductDetails } from "@/components/ProductDetails";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

const ProductIdPage = ({ data, }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    console.log(router.query.productId)
    if (!data) {
        return <div>Nie działa</div>

    }
    return (<>
        <Header />
        <Main>
            <ProductDetails data={{
                id: data.id,
                title: data.title,
                description: data.description,
                thumbnailUrl: data.image,
                thumbnailAlt: data.title,
                rating: data.rating.rate
            }} />
        </Main>
        <Footer />
    </>
    )
}
export default ProductIdPage;

export const getStaticPaths = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/`);
    const data: StoreApiResponse[] = await res.json();
    return {
        paths: data.map(product => {
            return {
                params: {
                    productId: product.id.toString(),
                }
            }
        }),
        fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps = async ({ params, }: GetStaticPropsContext<{productId: string}>) => {
    if (!params?.productId) {
        return {
            props: {},
            notFound: true,
            fallback: true
        }
    }
    const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
    const data: StoreApiResponse | null = await res.json();

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
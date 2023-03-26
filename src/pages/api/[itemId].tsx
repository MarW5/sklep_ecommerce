import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { ProductDetails } from "@/components/ProductDetails";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

const ItemIdPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {

    if (!data) {
        return <div>Nie działa</div>
    }
    return (
        <>
            <Header />
            <Main>
                {data.map((item:StoreApiResponse) => {
                    return (
                        <ProductDetails key={data.id} data={{
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            thumbnailUrl: item.image,
                            thumbnailAlt: item.title,
                            rating: item.rating.rate
                        }} />
                    )
                })}
            </Main>
            <Footer />
        </>
    )
}
export default ItemIdPage;

export const getStaticProps = async ({ params, }: GetStaticPropsContext<{ itemId: string }>) => {
    if (!params?.itemId) {
        return {
            props: {},
            notFound: true,
            fallback: true
        }
    }
    const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=0`);
    const data: StoreApiResponse | null = await res.json();
    return {
        props: {
            data,
        },
    };
};

export const getStaticPaths = async () => {
    const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=0`);
    const data: StoreApiResponse[] = await res.json();
    return {
        paths: data.map(item => {
            return {
                params: {
                    itemId: item.id.toString(),
                }
            }
        }),
        fallback: false
    }
}

interface StoreApiResponse {
    [x: string]: any;
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
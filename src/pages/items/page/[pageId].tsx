import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";
import { Items } from "@/components/Items";
import { Pagination } from "@/components/Pagination";

const ItemsPage = ({ data, pageId }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const pageSize = 25;
    const itemsLength = 4000;
   
    return (
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 ">
            {!data? 
            <div>Loading...</div>
            :
            data.map((product) => {
                return (
                    <li key={product.id}>
                        <Items data={{
                            id: product.id,
                            title: product.title,
                            thumbnailUrl: product.image,
                            thumbnailAlt: product.title,
                        }} />
                    </li>
                );
            })
            }
            <Pagination itemsCount={itemsLength} currentPage={Number(pageId)} pageSize={pageSize} />
        </ul>
    )
}

export default ItemsPage;

export const getStaticProps = async ({ params, }: GetStaticPropsContext<{ pageId: string }>) => {
    if (!params?.pageId) {
        return {
            props: {},
            notFound: true,
            fallback: true
        }
    }
    let pageValue;
    if(params.pageId === '1'){
        pageValue = "0"
    }else {
        pageValue = Number(params.pageId) * 25 - 25
    }
    const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${pageValue.toString()}`);
    const data: StoreApiResponse[] = await res.json();
    return {
        props: {
            data: data,
            pageId: params.pageId
        },
    };
};

export async function getStaticPaths() {
    return {
        paths: [
            { params: { pageId: '1' } },
            { params: { pageId: '2' } },
            { params: { pageId: '3' } }
        ],
        fallback: true,
    }
}

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
import { useRouter } from "next/router";

const CheckoutSuccessPage = () =>{
    const router = useRouter();
    console.log(router.query.sessionId);
    return <div>Success!</div>
}
export default CheckoutSuccessPage;
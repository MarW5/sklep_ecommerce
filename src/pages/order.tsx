import { Main } from "@/components/Main";
import { OrderForm } from "@/components/OrderForm";
import { OrderSummary } from "@/components/OrderSummary";
const OrderPage = () => {
    return (
        <Main>
            <div className="flex justify-around">
                <OrderSummary />
                <OrderForm /> 
            </div>
        </Main>
    ) 
}

export default OrderPage;
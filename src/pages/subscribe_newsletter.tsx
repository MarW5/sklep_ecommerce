import { Main } from "@/components/Main";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewsletterSubscribeSchema, newsletterSubscribeSchema } from "@/utils/formValidator";
import { FormContent } from "@/components/FormContent";
import { FormInput } from "@/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { subscribeUserToNewsletter } from '../hooksApiCall/subscribeNewsletter';
const ConfirmPage = () => {
    const formVariables = useForm<NewsletterSubscribeSchema>({resolver: yupResolver(newsletterSubscribeSchema)});
    const handleSendOrder:SubmitHandler<NewsletterSubscribeSchema> = (data) => {
        if(!data) {
            return;
        }
        subscribeUserToNewsletter(data)
    }
    return (
        <Main>
            <div>Zapisz się do newslettera!</div>
            <FormContent formVariables={formVariables} handleSubmitHandle ={handleSendOrder} >
                <FormInput label='Email address' name="email" />
                <FormInput label='Name' name="name" />
                <button onClick={()=> handleSendOrder()} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </FormContent>
        </Main>
    ) 
}

export default ConfirmPage;
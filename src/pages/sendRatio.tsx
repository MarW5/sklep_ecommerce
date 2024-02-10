import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProductReviewDocument, ReviewCreateInput, useCreateProductReviewMutation } from "@/generated/graphql";

import { Main } from "@/components/Main";
import { FormContent } from "@/components/FormContent";
import { FormInput } from "@/components/FormInput";
import { RatioFormType, ratioFormSchema } from "@/utils/formValidator";

const SendRatioPage = () => {
    const handeFormMethod = useForm<RatioFormType>({resolver: yupResolver(ratioFormSchema)});

    const [createReview, {data, loading}] = useCreateProductReviewMutation();
    const handleAddReview = (ratioData:ReviewCreateInput) => {
        createReview({
            variables: {
                review: {...ratioData}
            },
        })
    }

    const handleSubmitEvent = (ratioData:ReviewCreateInput) =>{
        handleAddReview(ratioData)
    }

    return (
        <Main>
             <FormContent handerFormMethod ={handeFormMethod} handleSubmitEvent ={handleSubmitEvent} >
                <FormInput label='Headline' name="headline" errorData={handeFormMethod.errors?.headline}/>
                <FormInput label='Name' name="name" errorData={handeFormMethod.errors?.name}/>
                <FormInput label='Email' name="email" errorData={handeFormMethod.errors?.email}/>
                <FormInput label='Text' name="content" errorData={handeFormMethod.errors?.content}/>
                <FormInput label='Rating' name="rating" errorData={handeFormMethod.errors?.rating}/>
                <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </FormContent>
        </Main>
    ) 
}

export default SendRatioPage;
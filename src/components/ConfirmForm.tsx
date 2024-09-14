import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { FormContent } from "./FormContent";
import { CheckoutFormType } from "@/utils/formValidator";
import { CreateProductReviewDocument, useCreateProductReviewMutation } from '@/generated/graphql';

import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "@/utils/formValidator";

export const CheckoutForm = ():CheckoutFormType => {
    const handeFormMethod = useForm<CheckoutFormType>({resolver: yupResolver(checkoutSchema)});

    // const [createReview, {data, loading}] = useCreateProductReviewMutation();
    // const handleAddReview = (reviewData) => {
    //     createReview({
    //         mutatation: CreateProductReviewDocument,
    //         variables: {
    //             review: {...reviewData}
    //         }
    //     })
    // }

    const handleSubmitEvent = (confirmData:CheckoutFormType) =>{
        console.log(confirmData)
    }
        return (
            <FormContent handerFormMethod ={handeFormMethod} handleSubmitEvent ={handleSubmitEvent} >
                <FormInput label='Email address' name="emailAddress" errorData={handeFormMethod.errors?.emailAddress}/>
                <FormInput label='Name on card' name="nameOnCard" errorData={handeFormMethod.errors?.nameOnCard}/>
                <FormInput label='Card number' name="cardNumber" errorData={handeFormMethod.errors?.cardNumber}/>
                <FormInput label='Date on card' name="cardDate" errorData={handeFormMethod.errors?.cardDate}/>
                <FormInput label='Cvc card' name="cvcCard" errorData={handeFormMethod.errors?.cvcCard}/>
                <FormInput label='Company' name="companyName" errorData={handeFormMethod.errors?.companyName}/>
                <FormInput label='Company address' name="companyAddress" errorData={handeFormMethod.errors?.companyAddress}/>
                <FormInput label='Apartment' name="apartmentName" errorData={handeFormMethod.errors?.apartmentName}/>
                <FormInput label='City' name="cityName" errorData={handeFormMethod.errors?.cityName}/>
                <FormInput label='State' name="stateName" errorData={handeFormMethod.errors?.stateName}/>
                <FormInput label='Postal code' name="postalCode" errorData={handeFormMethod.errors?.postalCode}/>
                <button onClick={()=> handleSubmitEvent()} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
        </FormContent>
        )
}


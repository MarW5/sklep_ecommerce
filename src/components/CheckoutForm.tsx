import { CheckoutFormType, checkoutSchema } from "@/utils/formValidator";
import { useForm } from "react-hook-form";
import { FormContent } from "./FormComponents/FormContent";
import { FormInput } from "./FormComponents/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckbox } from "./FormComponents/FormCheckbox";
import { useEffect } from "react";

export const CheckoutForm = () => {
    const handeFormMethod = useForm<CheckoutFormType>({resolver: yupResolver(checkoutSchema)});
    console.log(handeFormMethod)
    const handleSubmitEvent = (data) =>{
        console.log(data)
    }

    useEffect(()=>{
        console.log(handeFormMethod.watch('isCompanyBuy'))
    }, [handeFormMethod.watch('isCompanyBuy')])
        return (
            <FormContent formVariables ={handeFormMethod} handleSubmitEvent ={handleSubmitEvent} >
                <FormInput label='Imię' name="name" formVariables ={handeFormMethod}/>
                <FormInput label='Nazwisko' name="surname" formVariables ={handeFormMethod}/>
                <FormInput label='Email address' name="emailAddress" formVariables ={handeFormMethod}/>
                <FormCheckbox label='Zakup na firme' name="isCompanyBuy" formVariables ={handeFormMethod}/>
                {handeFormMethod.watch('isCompanyBuy') ?
                    <div>
                        <FormInput label='Nazwa Firmy' name="companyName" formVariables ={handeFormMethod}/>
                        <FormInput label='Nip firmy' name="taxId" formVariables ={handeFormMethod}/>
                    </div>
                 : null}
                <FormInput label='Ulica, numer budynku' name="streetName" formVariables ={handeFormMethod}/>
                <FormInput label='Miasto' name="cityName" formVariables ={handeFormMethod}/>
                <FormInput label='Kod pocztowy' name="postalCode" formVariables ={handeFormMethod}/>
                <button onClick={handeFormMethod.handleSubmit(handleSubmitEvent)} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Przejdź do płatności</button>
        </FormContent>
        )
}
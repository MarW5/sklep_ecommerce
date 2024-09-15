import React from "react";
import { FormInput } from "./FormInput";

export const OrderForm = () =>{
    return (
        <div>
            <FormContent handerFormMethod ={handeFormMethod} handleSubmitEvent ={handleSubmitEvent} >
                <FormInput label='Email address' name="email" errorData={handeFormMethod.errors?.emailAddress}/>
            </FormContent>
        </div>
    )
}
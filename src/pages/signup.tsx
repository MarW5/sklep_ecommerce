import { useState } from 'react';
import { FormContent } from "@/components/FormComponents/FormContent";
import { FormInput } from "@/components/FormComponents/FormInput";
import { SingUpFormType, singUpSchema } from "@/utils/formValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const SignUpPage = ()=> {
    const [ responseMsg, setResponseMsg ] = useState("");
    const handeFormMethod = useForm<SingUpFormType>({resolver: yupResolver(singUpSchema)});   
    const session = useSession()
    const router = useRouter()
    const handleSubmitEvent = (async (data: SingUpFormType) => {
        await fetch("/api/auth/signup", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(async (response)=>{
            const result = await response.json();
            setResponseMsg(result.message)
        }).catch(async (error)=>{
            const result = await error.json();
            setResponseMsg(result.message)
        })
    })
    
    if(session.status === "authenticated"){
        router.push("/");
        return null
    }

    return (
        <FormContent formVariables ={handeFormMethod} handleSubmitHandle ={handleSubmitEvent} >
                <FormInput label='Email' name="emailAddress" typeInput='email' />
                <FormInput label='Hasło' name="password" typeInput='password' />
                <FormInput label='Powtórz hasło' name="confirmPassword" typeInput='password' />
                <p>{responseMsg}</p>
                <button type='submit' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Zarejestruj się</button>
        </FormContent>
    )
}

export default SignUpPage;
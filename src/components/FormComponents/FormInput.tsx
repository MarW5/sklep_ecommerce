import { FieldError, UseFormReturn } from "react-hook-form";

interface FormInputType {
    label: string
    name: string
    formVariables: UseFormReturn
    typeInput: string
    classes: string
}

export const FormInput = ({ label, name, formVariables, typeInput='', classes='' }: FormInputType)=> {
    const {register, formState} = formVariables;
    const { errors }:  FieldError= formState;
    return (
        <div className={`md:flex md:items-center mb-6 ${classes}`}>
            <div className="md:w-1/3">
                <label className="block text-black-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={name}>{label}</label>
            </div>
            <div className="md:w-2/3">
                <input {...register(name)}
                type={typeInput}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                {errors[name] && <span className="text-red-500">{errors[name].message}</span>}
            </div>
        </div>
    )
}
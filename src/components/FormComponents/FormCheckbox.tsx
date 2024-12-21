import { FieldError, UseFormReturn } from "react-hook-form"

interface FormInputType {
    label: string
    name: string
    formVariables: UseFormReturn
    typeInput: string
    classes: string
}

export const FormCheckbox  = ({ label, name, formVariables, classes='' }: FormInputType) =>{
    const {register, formState} = formVariables;
        const { errors }:FieldError = formState;
    return (
        <div className={`md:flex md:items-center mb-6 ${classes}`}>
        <div className="md:w-1/3">
            <label className="block text-black-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={name}>{label}</label>
        </div>
        <div className="md:w-2/3">
            <input {...register(name)}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
            {errors[name] && <span className="text-red-500">{errors[name].message}</span>}
        </div>
    </div>
    )
}
import React, { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

type FormContentTypes = {
    children: ReactNode,
    formVariables: UseFormReturn;
    handleSubmitHandle: any;
    classes?: string;
  }

export const FormContent = ({ children, formVariables, handleSubmitHandle, classes="" } : FormContentTypes)=> {
    return (
        <form onSubmit={formVariables.handleSubmit(handleSubmitHandle)} className={classes}>
            {Array.isArray(children)
                ? children.map((child) => {
                    return child?.props.name?
                    React.createElement(child.type, {...{...child.props, formVariables, key: child.props.name}
                        })
                    : child;
                })
                : children}
        </form>
    );
}

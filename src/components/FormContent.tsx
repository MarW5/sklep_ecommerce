import React from "react";

export const FormContent = ({ children, formVariables, handleSubmitHandle, classes="" })=> {
    return (
        <form onSubmit={formVariables.handleSubmit(handleSubmitHandle)} className={classes}>
            {Array.isArray(children)
                ? children.map((child) => {
                    return child.props.name?
                    React.createElement(child.type, {...{...child.props, formVariables, key: child.props.name}
                        })
                    : child;
                })
                : children}
        </form>
    );
}

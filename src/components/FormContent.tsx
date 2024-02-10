import React from "react";

export const FormContent = ({ children, handerFormMethod, handleSubmitEvent })=> {
    return (
        <form onSubmit={handerFormMethod.handleSubmit(handleSubmitEvent)}>
            {Array.isArray(children)
                ? children.map((child) => {
                    return child.props.name?
                    React.createElement(child.type, {...{...child.props, handerFormMethod, key: child.props.name}
                        })
                    : child;
                })
                : children}
        </form>
    );
}

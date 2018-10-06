import React from 'react';

export const CustomInput = (
    {
        field,
        form: {touched, errors},
        label,
        ...props
    }
) => {
    const errorMsg = touched[field.name] && errors[field.name];
    const errClass = errorMsg ? 'error-input' : ''; 

    return (
        <div>
            <div>
                <input {...field} {...props} className={errClass}/>
            </div>
            { errorMsg && (
                <div className="error-msg">
                    * { errorMsg }
                </div>
            )}
        </div>
    );
}
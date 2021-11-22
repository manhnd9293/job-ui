import React from 'react'
import classes from './formTextInput.module.css'
export const FormTextInput = ({label,type, formData}) => {
    const {value, setValue, setIsTouch, showError} = formData;
    const errorInputClass = showError ? `${classes.error}` : '';

    return (
        <div>
            {label && <div>{label}</div>}
            <input  type={type || 'text'}
                    value = {value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={e => setIsTouch(true)}
                    className={`${classes.formInput} ${errorInputClass}`}
             ></input>
             {showError && (
                 <div className={classes.errorMessage}>Invalid value</div>
             )}
        </div>
    )
}

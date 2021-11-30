import React from 'react';
import classes from "../formTextSelect/formTextSelect.module.css";

const FormTextSelect = ({label, formData, options}) => {
    const {value, setValue, setIsTouch, showError, errorMessage} = formData;
    const errorInputClass = showError ? `${classes.error}` : "";
    const defaultLabel = `select ${label.toLowerCase()}`;

    const handleChange = (e) => {
        const selectedValue = e.target.value !== defaultLabel ? e.target.value : null;
        setValue(selectedValue);
    }

    return (
        <>
            {label && <div>{label}</div>}
            <select value={value}
                    onChange={handleChange}
                    onBlur={() => setIsTouch(true)}
                    className={`${classes.formInput} ${errorInputClass}`}
            >
                <option key={`null`} value={null}>{defaultLabel}</option>
                {options.map(option => (
                    <>
                        {option.label && option.value && <option key={option.value} value={option.value}>{option.label}</option>}
                        {(!option.label || (!option.value)) && <option key={option} value={option}>{option}</option>}
                    </>))
                }
            </select>
            <div
                className={classes.errorMessage}
                style={{visibility: showError ? "visible" : "hidden"}}
            >
                {errorMessage || "none"}
            </div>
        </>
    );
};

export default FormTextSelect;
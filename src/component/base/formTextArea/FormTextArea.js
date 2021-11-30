import React from "react";
import classes from "./formTextArea.module.css";
import ReactHtmlParser from 'react-html-parser'


export const FormTextArea = ({label, type, formData, width, height}) => {
    const {value, setValue, setIsTouch, showError, errorMessage, asyncError} = formData;
    const errorInputClass = showError ? `${classes.error}` : "";

    return (
        <>
            {label && <div>{label}</div>}
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => setIsTouch(true)}
                className={`${classes.formInput} ${errorInputClass}`}
                style={{width: width || '', height: height || '',resize: 'none'}}
            />
            <div
                className={classes.errorMessage}
                style={{visibility: showError ? "visible" : "hidden"}}
            >
                {errorMessage || asyncError || "none"}
            </div>
        </>
    );
};

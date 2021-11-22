import React from "react";
import classes from "./formTextInput.module.css";
export const FormTextInput = ({ label, type, formData }) => {
  const { value, setValue, setIsTouch, showError, errorMessage } = formData;
  const errorInputClass = showError ? `${classes.error}` : "";

  return (
    <>
      {label && <div>{label}</div>}
      <input
        type={type || "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => setIsTouch(true)}
        className={`${classes.formInput} ${errorInputClass}`}
      ></input>
      <div
        className={classes.errorMessage}
        style={{ visibility: showError ? "visible" : "hidden" }}
      >
        {errorMessage || "none"}
      </div>
    </>
  );
};

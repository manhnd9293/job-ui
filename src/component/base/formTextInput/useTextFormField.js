import { useState } from "react";
const useTextFormField = (validateFunction, initialValue) => {
  const [value, setValue] = useState(initialValue !== undefined ? initialValue : "");
  const [isTouch, setIsTouch] = useState(false);
  const errorMessage = validateFunction(value);
  const isValidValue = !errorMessage;
  const showError = isTouch && !isValidValue;

  return {
    value,
    setValue,
    isTouch,
    setIsTouch,
    isValidValue,
    showError,
    errorMessage,
  };
};

export default useTextFormField;

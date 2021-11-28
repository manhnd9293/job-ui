import { useState } from "react";
const useTextFormField = (validateFunction, initialValue) => {
  const [value, setValue] = useState(initialValue !== undefined ? initialValue : "");
  const [isTouch, setIsTouch] = useState(false);
  const errorMessage = validateFunction(value);
  const [asyncError, setAsyncError] = useState('');
  const isValidValue = !errorMessage && !asyncError;
  const showError = isTouch && !isValidValue;

  return {
    value,
    setValue,
    isTouch,
    setIsTouch,
    isValidValue,
    showError,
    errorMessage,
    asyncError,
    setAsyncError
  };
};

export default useTextFormField;

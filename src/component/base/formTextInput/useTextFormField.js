import { useState } from "react";
const useTextFormField = (validateFunction) => {
    const [value, setValue] = useState('');
    const [isTouch, setIsTouch] = useState (false);
    const errorMessage = validateFunction(value);
    const isValidValue = !errorMessage;
    const showError = isTouch && !isValidValue;

    return {value, setValue, isTouch, setIsTouch, isValidValue, showError, errorMessage}
}

export default useTextFormField;
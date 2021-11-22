import { useState } from "react";
const useTextFormField = (validateFunction) => {
    const [value, setValue] = useState('');
    const [isTouch, setIsTouch] = useState (false);

    const isValidValue = validateFunction(value);
    const showError = isTouch && !isValidValue;

    return {value, setValue, isTouch, setIsTouch, isValidValue, showError}
}

export default useTextFormField;
import React, {useState} from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";

const JdField = ({jdFormData}) => {
    const {value, setValue, setIsTouch,showError, errorMessage } = jdFormData;

    return (
        <>
            <CKEditor
                editor={ ClassicEditor }
                data={value}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setValue(data);
                }}
                onBlur={()=>{setIsTouch(true)}}
            />
            <div style={{visibility: `${showError ? 'visible' :'hidden'}`, color: 'red'}}>
                {errorMessage ? errorMessage : 'none'}
            </div>
        </>
    );
};


export default JdField;
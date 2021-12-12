import React, {useRef, useState} from 'react';

const UploadImageWrapper = ({children, onSelectFile}) => {
    const imageFile = useRef();

    const chooseFileToUpload = () => {
        // imageFile.current.value = null;
        imageFile.current.value = null;
        imageFile.current.click();
    }

    const emitChooseFileEvent = e =>{
        onSelectFile(e, imageFile);
    }


    return (
        <>
            <form style={{display: 'none'}}>
                <input type={'file'} ref={imageFile}
                       onChange={emitChooseFileEvent}/>
            </form>
            <span onClick={chooseFileToUpload}>
                {children}
            </span>
        </>
    );
};
/*
*  <UploadImageWrapper onUpload={uploadFile}>
        <BaseButton>UploadImage</BaseButton>
*  </UploadImageWrapper>
* */

export default UploadImageWrapper;
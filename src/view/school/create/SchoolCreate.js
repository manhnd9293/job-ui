import React, {useRef, useState} from 'react';
import classes from "../../company/createCompany/createCompany.module.css";
import {FormTextInput} from "../../../component/base/formTextInput/FormTextInput";
import useTextFormField from "../../../component/base/formTextInput/useTextFormField";
import {FormTextArea} from "../../../component/base/formTextArea/FormTextArea";

const SchoolCreate = () => {
    const validateSchoolName = (value) => {
        if (!value) {
            return "This field is required";
        }

        return "";
    }

    const validateRequired = (value) => {
        if (!value) {
            return "This field is required";
        }

        return "";
    }
    const companyNameFormData = useTextFormField(validateSchoolName);
    const schoolDescriptionData = useTextFormField(validateRequired);
    const [logoImg, setLogoImg] = useState();
    const [backgroundImg, setBackgroundImg] = useState();
    const logoInput = useRef(null);
    const backgroundInput = useRef(null);

    const clickSelectLogo = () => {
        logoInput.current.click();
    }

    const clickSelectBackground = () => {
        backgroundInput.current.click();
    }

    const onSelectLogoFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setLogoImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    function handleSubmit() {
        console.log('Create school');
    }

    function onSelectBackgroundFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setBackgroundImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={'viewTitle'}>Create school</div>
            <div>
                <div className={classes.formField}>
                    <FormTextInput label={'School name'}
                                   formData={companyNameFormData}
                    />
                </div>
            </div>
            <div className={'mt10'}>
                <div>School logo</div>
                <div className={classes.previewLogo}
                     style={{backgroundImage: `url(${logoImg || ''})`}}
                />
                <button className={'baseOutlineButton'} onClick={clickSelectLogo}>Upload logo</button>
                <input style={{display: 'none'}}
                       ref={logoInput}
                       type="file" accept="image/*" onChange={onSelectLogoFile}/>
            </div>

            <div className={'mt10'}>
                <div>School background</div>
                <div className={classes.previewLogo}
                     style={{backgroundImage: `url(${logoImg || ''})`}}
                />
                <button className={'baseOutlineButton'} onClick={clickSelectBackground}>Upload background</button>
                <input style={{display: 'none'}}
                       ref={backgroundInput}
                       type="file" accept="image/*" onChange={onSelectBackgroundFile}/>

            </div>

            <div className={classes.formField + ' mt10'}>
                <FormTextArea label={'Introduction'}
                              formData={schoolDescriptionData}
                              width={700}
                              height={200}
                />
            </div>

            <button className={'baseButton mt10'}
                    onClick={handleSubmit}
            >Create school</button>
        </div>
    );
};

export default SchoolCreate;
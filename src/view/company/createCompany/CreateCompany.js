import React, {useRef, useState} from 'react';
import {FormTextInput} from "../../../component/base/formTextInput/FormTextInput";
import useTextFormField from "../../../component/base/formTextInput/useTextFormField";
import FormTextSelect from "../../../component/base/formTextSelect/FormTextSelect";
import {FormTextArea} from "../../../component/base/formTextArea/FormTextArea";
import classes from './createCompany.module.css'

const CreateCompany = () => {
    const validateCompanyName = (value) => {
        if (!value) {
            return "This field is required";
        }
        // baseAxios.post('/user/checkUsername', {
        //     username: value
        // }).then(res => {
        //     const data = res.data;
        //     if (data.isExist) {
        //         userFormData.setAsyncError('Username existed')
        //     } else{
        //         userFormData.setAsyncError('')
        //     }
        // })

        return "";
    }

    const companyNameFormData = useTextFormField(validateCompanyName);
    const industryFormData = useTextFormField(requireRule);
    const sizeFormData = useTextFormField(requireRule);
    const addressFormData = useTextFormField(requireRule);
    const introductionFormData = useTextFormField(requireRule);
    const [logoImg, setLogoImg] = useState();
    const [coverImg, setCoverImg] = useState();
    const logoInput = useRef(null);
    const coverInput = useRef(null);

    const clickSelectLogo = () => {
        logoInput.current.click();
    }
    const onSelectLogoFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setLogoImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const clickSelectCover = () => {
        coverInput.current.click();
    }

    function onSelectCoverFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setCoverImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <div className={classes.viewContainer}>
            <div className={'viewTitle'}>Create a company page</div>
            <div className={classes.form}>
                <div className={classes.formField}>
                    <FormTextInput label={'Company name'}
                                   formData={companyNameFormData}
                    />
                </div>
                <div className={classes.formField}>
                    <FormTextSelect label={'Industry'}
                                    formData={industryFormData}
                                    options={industryOptions}
                    />
                </div>

                <div className={classes.formField}>
                    <FormTextSelect label={'Size'}
                                    formData={sizeFormData}
                                    options={sizeOptions}
                    />
                </div>

                <div className={classes.formField}>
                    <FormTextInput label={'Address'}
                                   formData={addressFormData}
                    />
                </div>

                <div className={'mt10'}>
                    <div>Company logo</div>
                    <div className={classes.previewLogo}
                         style={{backgroundImage: `url(${logoImg || ''})`}}
                    />
                    <button className={'baseOutlineButton'} onClick={clickSelectLogo}>Upload logo</button>
                    <input style={{display: 'none'}}
                           ref={logoInput}
                           type="file" accept="image/*" onChange={onSelectLogoFile}/>

                </div>

                <div className={'mt10'}>
                    <div>Page background picture</div>
                    <div className={classes.previewBackground}
                         style={{backgroundImage: `url(${coverImg || ''})`}}/>
                    <button className={'baseOutlineButton'} onClick={clickSelectCover}
                    >Choose background picture
                    </button>
                    <input style={{display: 'none'}}
                           ref={coverInput}
                           type="file" accept="image/*" onChange={onSelectCoverFile}/>
                </div>

                <div className={classes.formField + ' mt10'}>
                    <FormTextArea label={'Introduction'}
                                  formData={introductionFormData}
                                  width={700}
                                  height={200}
                    />
                </div>
            </div>
            <button className={'baseButton mt10'}>Create page</button>
        </div>
    );
};

const requireRule = (value) => {
    if (!value) {
        return "This field is required";
    }

    return '';
}

const sizeOptions = ['1-9', '10-99', '100-499', '500-2000', 'more than 2000'].map(data => data + ' employees')
const industryOptions = ['agriculture', 'automobile', 'finance', 'information technology', 'public service', 'beauty'].sort().map(data => data)

export default CreateCompany;
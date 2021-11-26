import React, {useEffect, useState} from 'react';
import classes from './jobPost.module.css'
import {FormTextInput} from "../../../component/base/formTextInput/FormTextInput";
import useTextFormField from "../../../component/base/formTextInput/useTextFormField";
import FormTextSelect from "../../../component/base/formTextSelect/FormTextSelect";
import {baseAxios} from "../../../config/AxiosConfig";
import JdField from "./JdField";

const JobPost = () => {
    const titleFormData = useTextFormField(validateJobTitle)
    const companyFormData = useTextFormField(requireRule);
    const workingAddressFormData = useTextFormField(requireRule);
    const yearOfExpFormData = useTextFormField(requireRule, 0);
    const jdFormData = useTextFormField(requireRule, '');
    const [negotiable, setNegotiable] = useState(false);
    const [jd, setJd] = useState('');
    const jdErrorMessage = requireRule(jd);

    const salaryRule = (value) => {
        if (negotiable) return;
        return requireRule(value);
    }

    const salaryFrom = useTextFormField(salaryRule,0);
    const salaryTo = useTextFormField(salaryRule,0);

    const [companyOptions, setCompanyOptions] = useState([]);

    useEffect(() => {
        baseAxios.get('/company/my/brief').then(res => {
            const options = res.data.map(company=> {
                return {
                    value: company._id,
                    label: company.name
                }
            })
            setCompanyOptions(options);
        }).catch((e) => {
            console.log('Fail to get company options')
        })
    },[])

    function saveDraftJd() {
        const validForm = !titleFormData.errorMessage && !companyFormData.errorMessage
        && !yearOfExpFormData.errorMessage && !salaryFrom.errorMessage && !salaryTo.errorMessage && !jdErrorMessage
        if (!validForm) {
            titleFormData.setIsTouch(true);
            companyFormData.setIsTouch(true);
            workingAddressFormData.setIsTouch(true);
            yearOfExpFormData.setIsTouch(true);
            salaryFrom.setIsTouch(true);
            salaryTo.setIsTouch(true);
            jdFormData.setIsTouch(true);
            return;
        }
    }

    return (
        <div>
            <div>Post a job</div>
            <div className={classes.formContainer}>
                <div style={{width: 300}}>
                    <FormTextInput
                        label={'Job title'}
                        formData={titleFormData}
                    />
                </div>
                <div style={{width: 300}}>
                    <FormTextSelect
                        label={'Company'}
                        formData={companyFormData}
                        options={companyOptions}
                    />
                </div>
                <div style={{width: 300}}>
                    <FormTextInput
                        label={'Working address'}
                        formData={workingAddressFormData}
                    />
                </div>
                <div>Year of experience</div>
                <div style={{width: 80}}>
                    <FormTextInput
                        formData={yearOfExpFormData}
                        type={'number'}
                    />
                </div>
                <div>
                    Salary
                </div>
                <div className={classes.salaryInfo}>
                    <div>
                        <input type={'checkbox'}
                               value={negotiable}
                               onChange={e => setNegotiable(e.target.checked)}
                        />
                        <label>Negotiation</label>
                    </div>
                    <div style={{width: 100}}>
                        <span>From</span>
                        <FormTextInput type={'number'}
                                       formData={salaryFrom}
                        />
                    </div>
                    <div style={{width: 100}}>
                        <span>To</span>
                        <FormTextInput type={'number'}
                                       formData={salaryTo}
                        />
                    </div>
                </div>
                <div>Job description</div>
                <div style={{ width: 800}}>
                    <JdField jdFormData={jdFormData}
                    />
                </div>
                <div className={classes.userAction}>
                    <button className={classes.reviewBtn}
                            onClick={saveDraftJd}
                    >Review</button>
                    <button className={classes.cancelBtn}>Cancel</button>
                </div>


            </div>
        </div>
    );
};

const validateJobTitle = (value) => {
    if (!value) {
        return "This field is required";
    }
    return "";
};

const requireRule = (value) => {
    if (!value && value !== 0) {
        return "This field is required";
    }
    return "";
};


export default JobPost;
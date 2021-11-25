import React, {useEffect, useState} from 'react';
import classes from './jobPost.module.css'
import {FormTextInput} from "../../../component/base/formTextInput/FormTextInput";
import useTextFormField from "../../../component/base/formTextInput/useTextFormField";
import FormTextSelect from "../../../component/base/formTextSelect/FormTextSelect";
import {baseAxios} from "../../../config/AxiosConfig";
const JobPost = () => {
    const titleFormData = useTextFormField(validateJobTitle)
    const companyFormData = useTextFormField(requireRule);
    const [negotiable, setNegotiable] = useState(false);

    const salaryRule = (value) => {
        if (negotiable) return;
        return requireRule(value);
    }
    const salaryFrom = useTextFormField(salaryRule);


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
                <div>
                    Salary
                </div>
                <div>
                    <input type={'checkbox'}
                           value={negotiable}
                           onChange={e => setNegotiable(e.target.checked)}
                    />
                    <label>Negotiation</label>
                </div>
                <span>From</span>
                <FormTextInput type={'number'}
                               formData={salaryFrom}
                />
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
    if (!value) {
        return "This field is required";
    }
    return "";
};


export default JobPost;
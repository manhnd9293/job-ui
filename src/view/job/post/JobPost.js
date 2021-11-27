import React, {useEffect, useState} from 'react';
import classes from './jobPost.module.css'
import {FormTextInput} from "../../../component/base/formTextInput/FormTextInput";
import useTextFormField from "../../../component/base/formTextInput/useTextFormField";
import FormTextSelect from "../../../component/base/formTextSelect/FormTextSelect";
import {baseAxios} from "../../../config/AxiosConfig";
import JdField from "./JdField";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const JobPost = () => {
    const navigate = useNavigate();
    const titleFormData = useTextFormField(validateJobTitle)
    const companyFormData = useTextFormField(requireRule);
    const workingAddressFormData = useTextFormField(requireRule);
    const yearOfExpFormData = useTextFormField(requireRule, 0);
    const jdFormData = useTextFormField(requireRule, '');
    const [negotiable, setNegotiable] = useState(false);

    const salaryRule = (value) => {
        if (negotiable) return;
        return requireRule(value);
    }

    const salaryFrom = useTextFormField(salaryRule,0);
    const salaryTo = useTextFormField(salaryRule,0);
    const formDataFields = [titleFormData, companyFormData, workingAddressFormData,
        yearOfExpFormData, jdFormData, salaryFrom, salaryTo]

    const checkValidField = () => {
        return !formDataFields.some(field =>
            field.errorMessage !== ''
        );
    }

    const setTouchField = () => {
        formDataFields.forEach(field => {
            field.setIsTouch(true);
        })
    }

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
        const validForm = checkValidField();
        if (!validForm) {
            setTouchField();
            return;
        }
        console.log(`submit form`);
        const data = {
            title: titleFormData.value,
            companyId: companyFormData.value,
            yearOfExperience: yearOfExpFormData.value,
            salary: {
                from: salaryFrom.value,
                to: salaryTo.value,
                currency: 'USD',
            },
            workAddress: workingAddressFormData.value,
            jobDescription: jdFormData.value,
            status: 'Pending'
        }
        baseAxios.post('/job', data).then(res => {
            const newJobId = res.data;
            navigate(`/job/post/review?jobId=${newJobId}`)
        })
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
                <div style={{fontWeight: 'bold'}}>
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
                    <div>
                        <div>USD</div>
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
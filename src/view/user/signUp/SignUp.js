import React, {useState} from 'react';
import classes from './register.module.css';
import {FormTextInput} from "../../../component/base/formTextInput/FormTextInput";
import useTextFormField from "../../../component/base/formTextInput/useTextFormField";
import {baseAxios} from "../../../config/AxiosConfig";
import {logInUser} from "../../../store/user/UserAction";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateUsername = (value) => {
        console.log('run validateUsername')
        if (!value) {
            return "This field is required";
        }
        baseAxios.post('/user/checkUsername', {
            username: value
        }).then(res => {
            const data = res.data;
            if (data.isExist) {
                userFormData.setAsyncError('Username existed')
            } else{
                userFormData.setAsyncError('')
            }
        })

        return "";
    };

    const userFormData = useTextFormField(validateUsername);

    const passwordFormData = useTextFormField(validatePassword);

    const confirmValueRule = (value) => {
        if (value !== passwordFormData.value) {
            return "Confirm password not match";
        }
        return "";
    }

    const confirmPasswordFormData = useTextFormField(confirmValueRule);
    const firstnameFormData = useTextFormField(requiredRule);
    const lastnameFormData = useTextFormField(requiredRule);

    const formData = [userFormData, passwordFormData, confirmPasswordFormData, firstnameFormData, lastnameFormData];
    const [errorMessage, setErrorMessage] = useState('none');
    const [invalidSignUp, setInvalidSignUp] = useState(false);


    const signUp = (e) => {
        e.preventDefault();

        const invalidForm = formData.some(data => !data.isValidValue);
        if (invalidForm) {
            formData.forEach(data => {
                data.setIsTouch(true);
            });
            return;
        }

        console.log('submit sign up request');

        const data = {
            username: userFormData.value,
            password: passwordFormData.value,
            confirmPassword: confirmPasswordFormData.value,
            firstname: firstnameFormData.value,
            lastname: lastnameFormData.value
        };
        baseAxios.post('/user/register', data).then(res => {
            dispatch(logInUser(res.data));
            navigate('/');
        }).catch(e => {
            setInvalidSignUp(true);
            setErrorMessage(`Fail to sign up user: ${e.toString()}`);
        })

    };
    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <h3>Sign Up</h3>
                <form onSubmit={signUp}>
                    <FormTextInput
                        label={"Firstname"}
                        formData={firstnameFormData}
                    />
                    <FormTextInput
                        label={"Lastname"}
                        formData={lastnameFormData}
                    />

                    <FormTextInput
                        label={"Username"}
                        formData={userFormData}
                    />

                    <FormTextInput
                        label={"Password"}
                        type={"password"}
                        formData={passwordFormData}
                    />
                    <FormTextInput
                        label={"Confirm Password"}
                        type={"password"}
                        formData={confirmPasswordFormData}
                    />
                    <div className={classes.errorLoginMessage}
                         style={{visibility: invalidSignUp ? 'visible' : 'hidden'}}
                    >{errorMessage}</div>
                    <div className={classes.userAction}>
                        <button className={classes.loginBtn}>Sign Up</button>
                    </div>
                </form>
                <div className={classes.separator}/>
                <div style={{textAlign: 'center'}}>
                    <span>Already have an account ? </span>
                    <span className={classes.signUpText}
                          onClick={e => {
                              navigate('/login')
                          }}
                    >Sign in</span>
                </div>
            </div>
        </div>
    );
};


const validatePassword = (value) => {
    if (!value) {
        return "This field is required";
    }
    return "";
};

const requiredRule = (value) => {
    if (!value) {
        return "This field is required";
    }
    return "";
};

export default SignUp;
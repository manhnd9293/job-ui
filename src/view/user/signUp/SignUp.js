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
        if (!value) {
            return "This field is required";
        }

        // baseAxios.post('/user/checkUsername', {
        //     username: value
        // }).then(res => {
        //     const data = res.data;
        //     if (data.isExist) {
        //         userFormData.setErrorMessage('Username existed')
        //         return;
        //     }
        //     if (!value) {
        //         userFormData.setErrorMessage("This field is required");
        //         return;
        //     }
        //     userFormData.setErrorMessage("");
        // })

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
        userFormData.setIsTouch(true);
        passwordFormData.setIsTouch(true);


        const data = {
            username: userFormData.value,
            password: passwordFormData.value,
        }
        baseAxios.post('/user/register', data).then(res => {
            dispatch(logInUser(res.data));
            navigate('/');
        }).catch(e => {
            setInvalidSignUp(true);
            setErrorMessage('Incorrect username and password, please check again !');
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
import React from 'react';
import classes from './register.module.css';
import {FormTextInput} from "../../../component/base/formTextInput/FormTextInput";
import useTextFormField from "../../../component/base/formTextInput/useTextFormField";
import {baseAxios} from "../../../config/AxiosConfig";
import {logInUser} from "../../../store/user/UserAction";

const SignUp = () => {
    const userFormData = useTextFormField(validateUsername);
    const passwordFormData = useTextFormField(validatePassword);

    const isValidForm = userFormData.isValidValue && passwordFormData.isValidValue;

    // const login = (e) => {
    //     e.preventDefault();
    //     userFormData.setIsTouch(true);
    //     passwordFormData.setIsTouch(true);
    //
    //     if (!isValidForm) {
    //         return;
    //     }
    //
    //     const data = {
    //         username: userFormData.value,
    //         password: passwordFormData.value,
    //     }
    //     baseAxios.post('/user/login', data).then(res => {
    //         dispatch(logInUser(res.data));
    //         navigate('/');
    //     }).catch(e => {
    //         setInvalidLogin(true);
    //         setErrorMessage('Incorrect username and password, please check again !');
    //     })
    //
    // };
    return (
        <div className={classes.container}>
            <div className={'title'}>Sign Up</div>
            {/*<div className={classes.card}>*/}
            {/*    <h3>Login</h3>*/}
            {/*    <form onSubmit={login}>*/}
            {/*        <FormTextInput*/}
            {/*            label={"Username"}*/}
            {/*            formData={userFormData}*/}
            {/*        />*/}
            {/*        <FormTextInput*/}
            {/*            label={"Password"}*/}
            {/*            type={"password"}*/}
            {/*            formData={passwordFormData}*/}
            {/*        />*/}
            {/*        <div className={classes.errorLoginMessage}*/}
            {/*             style={{visibility: invalidLogin ? 'visible' : 'hidden'}}*/}
            {/*        >{errorMessage}</div>*/}
            {/*        <div className={classes.userAction}>*/}
            {/*            <button className={classes.loginBtn}>Login</button>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*    <div className={classes.separator}/>*/}
            {/*    <div style={{textAlign: 'center'}}>*/}
            {/*        <span>Do not have an account ? </span>*/}
            {/*        <span className={classes.signUpText}>Sign up</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

const validateUsername = (value) => {
    if (!value) {
        return "This field is required";
    }
    return "";
};

const validatePassword = (value) => {
    if (!value) {
        return "This field is required";
    }
    return "";
};

export default SignUp;
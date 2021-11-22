import React from 'react'
import { FormTextInput } from '../../component/base/formTextInput/FormTextInput';
import useTextFormField from '../../component/base/formTextInput/useTextFormField';
import classes from './login.module.css'
export const Login = () => {
    const userFormData = useTextFormField(validateUsername);
    const passwordFormData = useTextFormField(validatePassword);
    const login = (e) => {
        e.preventDefault();
        
    }
    return (
        <div className={classes.container}>
                <form onSubmit={login}>
            <div className={classes.card}>
                <h3>Login</h3>
                <FormTextInput label={'Username'}
                               formData={userFormData}
                ></FormTextInput>
                 <FormTextInput label={'Password'}
                                type={'password'}
                               formData={passwordFormData}
                ></FormTextInput>
            
                <button className={classes.loginBtn}>Login</button>
            </div>
            </form>

        </div>
    )
}

const validateUsername = (value) => {
    if(!value){
        return 'This field is required'
    }
    return true;
}


const validatePassword = (value) => {
    if(!value){
        return 'This field is required'
    }
    return true;
}
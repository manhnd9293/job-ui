import React from 'react'
import { FormTextInput } from '../../component/base/formTextInput/FormTextInput';
import useTextFormField from '../../component/base/formTextInput/useTextFormField';
import classes from './login.module.css'
export const Login = () => {
    const userFormData = useTextFormField((value) => !!value);
    const passwordFormData = useTextFormField((value) => !!value);
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

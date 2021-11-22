import React from "react";
import { FormTextInput } from "../../component/base/formTextInput/FormTextInput";
import useTextFormField from "../../component/base/formTextInput/useTextFormField";
import { baseAxios } from "../../config/AxiosConfig";
import classes from "./login.module.css";
export const Login = () => {
  const userFormData = useTextFormField(validateUsername);
  const passwordFormData = useTextFormField(validatePassword);
  const isValidForm = userFormData.isValidValue && passwordFormData.isValidValue;
  
  const login = (e) => {
    e.preventDefault();
    userFormData.setIsTouch(true);
    passwordFormData.setIsTouch(true);

    if(!isValidForm){
      return;
    }
    const data = {
      username: userFormData.value,
      password: passwordFormData.value,
    }
    baseAxios.post('/user/login', data).then(res => {
      console.log(res);
    })

  };
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h3>Login</h3>
        <form onSubmit={login}>
          <FormTextInput
            label={"Username"}
            formData={userFormData}
          ></FormTextInput>
          <FormTextInput
            label={"Password"}
            type={"password"}
            formData={passwordFormData}
          ></FormTextInput>
          <div className={classes.userAction}>
            <button className={classes.loginBtn}>Login</button>
          </div>
        </form>
        <div className={classes.separator}></div>
        <div style={{textAlign: 'center'}}>
          <span>Do not have an account ? </span>
          <span className={classes.signUpText}>Sign up</span>
        </div>
      </div>
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

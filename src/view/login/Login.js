import React from 'react'
import classes from './login.module.css'
export const Login = () => {

    const login = (e) => {
        e.preventDefault();
        
    }
    return (
        <div className={classes.container}>
                <form onSubmit={login}>
            <div className={classes.card}>
                <h3>Login</h3>
            
                    <label>Username</label>
                    <input type={'text'}></input>
                    <label>Password</label>
                    <input type={'password'}></input>
                    <button className={classes.loginBtn}>Login</button>
            </div>
            </form>

        </div>
    )
}

import React from 'react'

import classes from './footer.module.css'
export const Footer = () => {
    return (
        <div className={classes.container}>
            <div style={{color: 'white'}}>Copyright by Manhnd - {new Date().getFullYear()}</div>
            <div>Power by docker</div>
        </div>

    )
}

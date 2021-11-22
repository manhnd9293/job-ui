import React from 'react'
import classes from './header.module.css'
export const Header = () => {
    return (
        <div className={classes.container}> 
            <nav>
                <div className={classes.appName}>DEVJOB</div>
                <input className={classes.searchJob} 
                type='text'
                placeholder='Search for title, skills, company'
                />
                <select placeholder='city'
                        className={classes.citySelect} 
                >
                    <option>Hanoi</option>
                    <option>Danang</option>
                    <option>HoChiMinh</option>
                </select>
            </nav>
        </div>
    )
}

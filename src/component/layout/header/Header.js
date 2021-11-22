import React from 'react'
import { Link } from 'react-router-dom'
import classes from './header.module.css'
export const Header = () => {
    return (
        <div className={classes.container}> 
            <nav>
                <div className={classes.appName}>
                    <Link to={'/'} 
                          style={{color: 'white', textDecoration: 'none'}}>
                              DEVJOB
                    </Link>
                </div>
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

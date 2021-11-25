import React from "react";
import {useSelector} from "react-redux";
import classes from "./sidebar.module.css";
import {FcBriefcase, FcOrganization} from "react-icons/fc";
import {Link} from "react-router-dom";

export const SideBar = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className={classes.container}>
            <div className={classes.menuItem}>
                <div
                    className={classes.title}
                >{`${user.firstname} ${user.lastname}`}</div>
            </div>
            <div className={classes.menuItem}>
                <div className={classes.title}>
                    <FcBriefcase size={25}/>
                    Jobs
                </div>
                <span className={classes.subTitle}>Job search</span>
                <Link to="/job/post"
                      style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <span className={classes.subTitle}>Job post</span>

                </Link>
                <span className={classes.subTitle}>Your apply</span>
            </div>
            <div className={classes.menuItem}>
                <div className={classes.title}>
                    <FcOrganization size={25}></FcOrganization>
                    <span>Company</span>
                </div>
                <Link to="/company/search"
                      style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <span className={classes.subTitle}>Search</span>
                </Link>
                <Link to="/company/create"
                      style={{textDecoration: 'none', color: 'inherit'}}

                >
                    <span className={classes.subTitle}>Create a page</span>
                </Link>
                <Link to='/company/mine'
                      style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <span className={classes.subTitle}>Your company</span>
                </Link>
            </div>
        </div>
    );
};

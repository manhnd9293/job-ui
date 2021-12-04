import React from "react";
import {useDispatch, useSelector} from "react-redux";
import classes from "./sidebar.module.css";
import {FcBriefcase, FcOrganization} from "react-icons/fc";
import {Link, useNavigate} from "react-router-dom";
import {RoutePath} from "../../../constant/RouteConstant";
import {logInUser, logOutUser} from "../../../store/user/UserAction";

export const SideBar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logOut() {
        dispatch(logOutUser());
        navigate('/login')
    }

    return (
        <div className={classes.container}>
            <div className={classes.menuItem}>
                <div
                    className={classes.title}
                >{`${user.firstname} ${user.lastname}`}</div>
                <div className={'ml10'}
                     onClick={logOut}
                >Log out</div>
            </div>
            <div className={classes.menuItem}>
                <div className={classes.title}>
                    <FcBriefcase size={25}/>
                    Jobs
                </div>
                <Link to={RoutePath.SearchJob}
                      style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <span className={classes.subTitle}>Job search</span>
                </Link>
                <Link to="/job/posting/list"
                      style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <span className={classes.subTitle}>Job post</span>

                </Link>
                <span className={classes.subTitle}>Your apply</span>
            </div>
            <div className={classes.menuItem}>
                <div className={classes.title}>
                    <FcOrganization size={25}/>
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

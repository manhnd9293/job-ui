import React from "react";
import {useDispatch, useSelector} from "react-redux";
import classes from "./sidebar.module.css";
import {FcBriefcase, FcOrganization} from "react-icons/fc";
import {NavLink, useNavigate} from "react-router-dom";
import {RoutePath} from "../../../constant/RouteConstant";
import {logOutUser} from "../../../store/user/UserAction";
import {Role} from "../../../enums/Roles";

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
                >Log out
                </div>
            </div>
            {   user.roles.includes(Role.SuperAdmin) &&
                <NavLink to={RoutePath.Admin}>
                    <div className={classes.menuItem}
                         style={{textDecoration: 'none', color: 'inherit'}}
                    >
                        <div
                            className={classes.title}
                        >Admin</div>

                    </div>
                </NavLink>
            }
            <div className={classes.menuItem}>
                <div className={classes.title}>
                    <FcBriefcase size={25}/>
                    Jobs
                </div>
                <NavLink to={RoutePath.SearchJob}
                         className={(navData) => `${classes.subTitle} ${navData.isActive ? classes.isActive : ''}`}
                         style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <span >Job search</span>
                </NavLink>
                <NavLink to="/job/post"
                         className={(navData) => `${classes.subTitle} ${navData.isActive ? classes.isActive : ''}`}
                         style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <span >Job post</span>
                </NavLink>
                <NavLink to="/job/posting/list"
                         className={(navData) => `${classes.subTitle} ${navData.isActive ? classes.isActive : ''}`}
                         style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <span >My Posted Jobs</span>

                </NavLink>
            </div>
            <div className={classes.menuItem}>
                <div className={classes.title}>
                    <FcOrganization size={25}/>
                    <span>Company</span>
                </div>
                <NavLink to="/company/search"
                         style={{textDecoration: 'none', color: 'inherit'}}
                         className={(navData) => `${classes.subTitle} ${navData.isActive ? classes.isActive : ''}`}
                >
                    <span >Search</span>
                </NavLink>
                <NavLink to="/company/create"
                         style={{textDecoration: 'none', color: 'inherit'}}
                         className={(navData) => `${classes.subTitle} ${navData.isActive ? classes.isActive : ''}`}

                >
                    <span >Create a page</span>
                </NavLink>
                <NavLink to={RoutePath.MyCompanyList}
                         style={{textDecoration: 'none', color: 'inherit'}}
                         className={(navData) => `${classes.subTitle} ${navData.isActive ? classes.isActive : ''}`}
                >
                    <span>My pages</span>
                </NavLink>
            </div>
        </div>
    );
};

import React from 'react';
import {useSelector} from "react-redux";
import {Role} from "../../../enums/Roles";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../../constant/RouteConstant";

const SchoolList = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    return (
        <div>
            <div className={'viewTitle'}>List school</div>
            <div className={'mt10'}>
                {user.roles?.includes(Role.SuperAdmin) && (
                    <button className={'baseButton'}
                            onClick={()=>{navigate(RoutePath.SchoolCreate)}}
                    >Create school</button>
                )}
            </div>
        </div>
    );
};

export default SchoolList;
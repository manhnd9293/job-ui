import React from 'react';
import BaseCard from "../../component/base/baseCard/baseCard";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../constant/RouteConstant";

const Admin = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className={'viewTitle'}>Admin page</div>
            <div>
                <BaseCard width={100} shadow={true}
                          onClick={() => {navigate(RoutePath.SchoolList)}}
                >
                    School
                </BaseCard>
            </div>
        </div>
    );
};

export default Admin;
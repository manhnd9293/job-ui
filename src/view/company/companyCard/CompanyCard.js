import React from 'react';
import classes from "./companyCard.module.css";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../../constant/RouteConstant";

const CompanyCard = ({company}) => {

    const navigate = useNavigate();
    const goToCompanyView = (companyId) => () =>{
        navigate(`${RoutePath.CompanyDetail}?id=${companyId}`)
    }

    return (
        <>
            <div key={company._id} className={classes.companyCard}
                 onClick={goToCompanyView(company._id)}
            >
                <div>
                    <img style={{width: '60px', height: '60px'}} src={`${process.env.REACT_APP_SERVER_URL}/api/v1/company/${company._id}/logo/v${company.logoVersion}`}/>
                </div>
                <div className={classes.companyInfo}>
                    <div style={{fontWeight: 'bold'}}>{company.name}</div>
                    <div>Size: {company.size}</div>
                    <div>Industry: {company.industry}</div>
                    <div>Address: {company.address}</div>
                </div>
            </div>
        </>
    );
};

export default CompanyCard;
import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./companySearch.module.css";
export const CompanyList = ({ companyList }) => {
  const navigate = useNavigate();
  const goToCompanyView = (companyId) => () =>{
    navigate(`/company/detail?id=${companyId}`)
  }
  return (
    <div>
      <h3>List companies</h3>
      {companyList.map((company) => (
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
      ))}
    </div>
  );
};

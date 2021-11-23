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
              
          </div>
          <div className={classes.companyInfo}>
            <div>{company.name}</div>
            <div>{company.size}</div>
            <div>{company.industry}</div>
            <div>{company.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

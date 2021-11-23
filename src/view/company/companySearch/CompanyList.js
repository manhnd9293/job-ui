import React from "react";
import classes from "./companySearch.module.css";
export const CompanyList = ({ companyList }) => {
  return (
    <div>
      <h3>List companies</h3>
      {companyList.map((company) => (
        <div key={company._id} className={classes.companyCard}>
          <div>
              <img src={company.logoUrl}></img>
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

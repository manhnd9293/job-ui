import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./companySearch.module.css";
import CompanyCard from "../companyCard/CompanyCard";
export const CompanyList = ({ companyList }) => {
  const navigate = useNavigate();
  const goToCompanyView = (companyId) => () =>{
    navigate(`/company/detail?id=${companyId}`)
  }
  return (
    <div>
      <h3>List companies</h3>
      {companyList.map((company) => (
        <CompanyCard company={company}/>
      ))}
    </div>
  );
};

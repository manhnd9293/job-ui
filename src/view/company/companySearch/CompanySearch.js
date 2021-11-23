import React, { useEffect, useState } from "react";
import { ActionBar } from "./ActionBar";
import classes from "./companySearch.module.css";
import { CompanyList } from "./CompanyList";
import { baseAxios } from "../../../config/AxiosConfig";
export const CompanySearch = () => {
    const [companyList, setCompanyList] = useState([])
    useEffect(() => {
        baseAxios.get('/company').then((res) => {
            setCompanyList(res.data);
        })
        
    }, [])
  
    return (
    <div className={classes.container}>
        <ActionBar></ActionBar>
        <CompanyList companyList={companyList}></CompanyList>
    </div>
  );
};

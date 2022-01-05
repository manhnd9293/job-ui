import React, { useEffect, useState } from "react";
import { ActionBar } from "./ActionBar";
import classes from "./companySearch.module.css";
import { CompanyList } from "./CompanyList";
import { baseAxios } from "../../../config/AxiosConfig";
import {useLocation} from "react-router-dom";
export const CompanySearch = () => {
    const query = new URLSearchParams(useLocation().search);
    const [companyList, setCompanyList] = useState([])
    useEffect(() => {
        const searchKey = query.get('searchKey');
        const industry = query.get('industry');
        const location = query.get('location');
        const size = query.get('size');

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

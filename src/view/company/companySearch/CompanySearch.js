import React, {useEffect, useState} from "react";
import {ActionBar} from "./ActionBar";
import classes from "./companySearch.module.css";
import {CompanyList} from "./CompanyList";
import {baseAxios} from "../../../config/AxiosConfig";
import {useLocation, useNavigate} from "react-router-dom";
import {RoutePath} from "../../../constant/RouteConstant";

export const CompanySearch = () => {
    const query = new URLSearchParams(useLocation().search);
    const [companyList, setCompanyList] = useState([]);
    const [searching, setSearching] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        const searchKey = query.get('searchKey');
        const industry = query.get('industry');
        const location = query.get('city');
        const size = query.get('size');
        getCompanyList(searchKey,industry, location, size);
        setSearching(false)
    }, []);

    const getCompanyList = (searchKey,industry,location,size) => {
        baseAxios.get(`/company?searchKey=${searchKey || ''}&industry=${industry || ''}&city=${location || ''}&size=${size || ''}`).then((res) => {
            setCompanyList(res.data);
        })
    }

    const searchCompany = (filterData) => {
        const {searchKey, industry, location, size} = filterData;
        getCompanyList(searchKey, industry, location, size);
        navigate(`${RoutePath.ListCompany}?searchKey=${searchKey || ''}&industry=${industry || ''}&city=${location || ''}&size=${size || ''}`);

    };

    return (
        <div className={classes.container}>
            <ActionBar onSearch={searchCompany}/>
            <CompanyList companyList={companyList}/>
        </div>
    );
};

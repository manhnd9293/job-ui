import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {baseAxios} from "../../../config/AxiosConfig";
import classes from "./companyDetail.module.css";

export const CompanyDetail = () => {
    const query = new URLSearchParams(useLocation().search);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const id = query.get("id");
        baseAxios.get(`/company/${id}`).then((res) => {
            setCompany(res.data);
        });
    }, []);

    return (
        <div className={classes.container}>
            <div
                className={classes.coverPic}
                style={{backgroundImage: `url(${company?.backDropUrl})`}}
            />
            <div
                className={classes.logo}
                style={{backgroundImage: `url(${company?.logoUrl})`}}
            />

            <div className={classes.name}>{company?.name}</div>
            <div>
                <span>Industry: </span>
                <span>{company?.industry}</span>
            </div>
            <div>
                <span>Size: </span>
                <span>{company?.size} employess</span>
            </div>
            <div>
                <span>Address: </span>
                <span>{company?.address}</span>
            </div>

        </div>
    );
};

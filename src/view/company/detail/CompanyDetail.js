import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {baseAxios} from "../../../config/AxiosConfig";
import classes from "./companyDetail.module.css";
import {useSelector} from "react-redux";
import AddCompanyPhotoModal from "./photoContainer/AddCompanyPhotoModal";
import {FaTimes} from "react-icons/all";
import PhotoContainer from "./photoContainer/PhotoContainer";

export const CompanyDetail = () => {
    const query = new URLSearchParams(useLocation().search);
    const [company, setCompany] = useState(null);
    const user = useSelector(state => state.user);

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
            <div className={classes.content}>
                <div className={classes.tabName}>About</div>
                <div className={classes.hSep}></div>
                <div className={classes.contentTitle}>General information</div>
                <div>
                    <span>Industry: </span>
                    <span>{company?.industry}</span>
                </div>
                <div>
                    <span>Size: </span>
                    <span>{company?.size}</span>
                </div>
                <div>
                    <span>Address: </span>
                    <span>{company?.address}</span>
                </div>
                <div className={classes.contentTitle}>Introduction:</div>
                <div>{company?.description}</div>
                <PhotoContainer company={company}
                                user={user}
                />

            </div>

        </div>
    );
};

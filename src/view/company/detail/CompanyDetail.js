import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {baseAxios} from "../../../config/AxiosConfig";
import classes from "./companyDetail.module.css";
import {useSelector} from "react-redux";
import PhotoContainer from "./photoContainer/PhotoContainer";
import LargePhotoModal from "./photoContainer/LargePhotoModal";

export const CompanyDetail = () => {
    const query = new URLSearchParams(useLocation().search);
    const [company, setCompany] = useState(null);
    const [showLargePhoto, setShowLargePhoto] = useState(false);
    const [largePhotoUrl, setLargePhotoUrl] = useState(null);
    const user = useSelector(state => state.user);

    useEffect(() => {
        loadCompany();
    }, []);

    const loadCompany = () => {
        const id = query.get("id");
        baseAxios.get(`/company/${id}`).then((res) => {
            setCompany(res.data);
        });
    }

    const showLargeImg = (url) => {
        setLargePhotoUrl(url);
        setShowLargePhoto(true);
    }


    let logoUrl = company?.logoUrl;
    let backDropUrl = company?.backDropUrl;

    return (
        <div className={classes.container}>
            <div
                className={classes.coverPic}
                style={{backgroundImage: `url(${backDropUrl})`}}
                onClick={() => {
                    showLargeImg(backDropUrl);
                }}
            />
            <div
                className={classes.logo}
                style={{backgroundImage: `url(${logoUrl})`}}
                onClick={() => {
                    showLargeImg(logoUrl)
                }}
            />

            <div className={classes.name}>{company?.name}</div>
            <div className={classes.content}>
                <div className={classes.tabName}>About</div>
                <div className={classes.hSep}/>
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
                                onUpdatePhotoList={loadCompany}
                                showLarge={showLargeImg}
                />
            </div>
            {largePhotoUrl &&
              <LargePhotoModal setShow={setShowLargePhoto}
                               show={showLargePhoto}
                               imgSrc={largePhotoUrl}
              />}
        </div>
    );
};

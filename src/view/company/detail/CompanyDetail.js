import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {baseAxios} from "../../../config/AxiosConfig";
import classes from "./companyDetail.module.css";
import {useSelector} from "react-redux";
import AddCompanyPhotoModal from "./AddCompanyPhotoModal";

export const CompanyDetail = () => {
    const query = new URLSearchParams(useLocation().search);
    const [company, setCompany] = useState(null);
    const user = useSelector(state => state.user);
    const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

    useEffect(() => {
        const id = query.get("id");
        baseAxios.get(`/company/${id}`).then((res) => {
            setCompany(res.data);
        });
    }, []);

    const onCompleteAddPhoto = (url) => {
        setShowAddPhotoModal(false);
        company.photos.push(url);
    };
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
                <div className={classes.contentTitle}>
                    <span>Company photos</span>
                    {user.id === company?.createdByUserId &&
                    <button className={'smallBtn baseButton ml5'}
                            onClick={event => setShowAddPhotoModal(true)}

                    >Add photo</button>
                    }
                </div>
                <div className={classes.photoContainer}>
                    {company?.photos.map(photo =>
                        <div className={classes.companyPhoto}
                             key={photo._id}
                             style={{backgroundImage: `url(${photo.url})`}}
                        />
                    )}
                </div>
            </div>
            {showAddPhotoModal &&
            <AddCompanyPhotoModal showAddPhotoModal={showAddPhotoModal}
                                  setShowAddPhotoModal={setShowAddPhotoModal}
                                  company={company}
                                  onComplete={onCompleteAddPhoto}
            />}

        </div>
    );
};

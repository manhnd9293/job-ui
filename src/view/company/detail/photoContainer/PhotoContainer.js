import React, {useState} from 'react';
import classes from "../companyDetail.module.css";
import {FaTimes} from "react-icons/all";
import AddCompanyPhotoModal from "./AddCompanyPhotoModal";
import ConfirmDeletePhotoModal from "./ConfirmDeletePhotoModal";

const PhotoContainer = ({company, user}) => {
    const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [deletePhotoId, setDeletePhotoId] = useState(null);


    const onCompleteAddPhoto = (url) => {
        setShowAddPhotoModal(false);
        company.photos.push(url);
    };

    const showDeleteConfirmModal = photoId => (e) => {
        console.log('click');
        setDeletePhotoId(photoId);
        setShowConfirmDelete(true);
    }

    return (
        <>
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
                    >
                        {user.id === company.createdByUserId &&
                        <span style={{position: 'absolute', top: 5, right: 5}}
                              onClick={showDeleteConfirmModal(photo._id)}
                        >
                                <FaTimes size={12} fontWeight={'lighter'}/>
                            </span>}
                    </div>
                )}
            </div>
            {showAddPhotoModal &&
            <AddCompanyPhotoModal showAddPhotoModal={showAddPhotoModal}
                                  setShowAddPhotoModal={setShowAddPhotoModal}
                                  company={company}
                                  onComplete={onCompleteAddPhoto}
            />}

            {showConfirmDelete &&
            <ConfirmDeletePhotoModal company={company}
                                     photoId={deletePhotoId}
                                     showModal={showConfirmDelete}
                                     setShowModal={setShowConfirmDelete}
            />
            }

        </>
    );
};

export default PhotoContainer;
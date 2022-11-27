import React, {useState} from 'react';
import classes from "../companyDetail.module.css";
import {FaTimes} from "react-icons/all";
import AddCompanyPhotoModal from "./AddCompanyPhotoModal";
import ConfirmDeletePhotoModal from "./ConfirmDeletePhotoModal";
import {baseAxios} from "../../../../config/AxiosConfig";

const PhotoContainer = ({company, user, onUpdatePhotoList, showLarge}) => {
    const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [deletePhotoId, setDeletePhotoId] = useState(null);
    const [photoList, setPhotoList] = useState(company?.photos || []);


    const onCompleteAddPhoto = (url) => {
        setShowAddPhotoModal(false);
        onUpdatePhotoList()
    };

    const showDeleteConfirmModal = photoId => (e) => {
        e.stopPropagation();
        setDeletePhotoId(photoId);
        setShowConfirmDelete(true);

    }

    const confirmDelete = (photoId) => () =>{
        baseAxios.delete(`/company/${company._id}/photos/${photoId}`).then(res => {
            setShowConfirmDelete(false);
            onUpdatePhotoList()
        })
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
                         onClick={()=> {
                             showLarge(photo.url)
                         }}
                    >
                        {user.id === company.createdByUserId &&
                        <span style={{position: 'absolute', top: 5, right: 5}}
                              onClick={showDeleteConfirmModal(photo._id)}
                        >
                                <FaTimes size={15} fontWeight={'lighter'} color='white smoke'/>
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
                                     onDelete={confirmDelete}
            />}
        </>
    );
};

export default PhotoContainer;
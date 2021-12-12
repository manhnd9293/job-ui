import React, {useRef, useState} from 'react';
import BaseModal from "../../../component/base/modal/BaseModal";
import UploadImageWrapper from "../../../component/base/uploadImageWrapper/UploadImageWrapper";
import classes from './companyDetail.module.css'
import {baseAxios} from "../../../config/AxiosConfig";
const AddCompanyPhotoModal = ({showAddPhotoModal, setShowAddPhotoModal, company, onComplete}) => {
    const [photo, setPhoto] = useState(null);
    const imageFileRef = useRef();
    const selectPhoto = (e, inputRef) => {
        imageFileRef.current = inputRef.current;
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setPhoto(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    async function uploadPhoto() {
        try {
            const data = new FormData();
            data.append('photo', imageFileRef.current.files[0]);
            console.log(data);
            const response = await baseAxios.patch(`/company/${company._id}/photo`, data , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onComplete(response.data);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <BaseModal width={600}
                   visible={showAddPhotoModal}
                   setVisible={setShowAddPhotoModal}
                   header={`Add company photo`}
        >
            <UploadImageWrapper onSelectFile={selectPhoto}>
                <button className={'baseButton'}>Choose image</button>
            </UploadImageWrapper>
            <div className={classes.previewImg }
                 style={{backgroundImage: `url(${photo || ''})`}}
            />
            <div className={'mt10'}>
                <button className={'baseButton'}
                        onClick={uploadPhoto}
                >Upload</button>
                <button className={'baseButton cancelBtn ml10'}
                        onClick={event => setShowAddPhotoModal(false)}
                >Cancel</button>
            </div>
        </BaseModal>
    );
};

export default AddCompanyPhotoModal;
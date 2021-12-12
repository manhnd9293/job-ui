import React from 'react';
import BaseModal from "../../../../component/base/modal/BaseModal";

const ConfirmDeletePhotoModal = ({showModal, setShowModal, company, photoId}) => {
    function confirmDelete() {

    }

    return (
        <BaseModal width={600}
                   visible={showModal}
                   setVisible={setShowModal}
                   header={`Remove company photo`}
        >
            <div>Are you sure want to remove this photo from company collection ?</div>
            <div className={'mt10'}>
                <button className={'baseButton'} onClick={confirmDelete}>Delete</button>
                <button className={'baseButton cancelBtn ml10'}
                        onClick={event => setShowModal(false)}>Cancel</button>
            </div>
        </BaseModal>
    );
};

export default ConfirmDeletePhotoModal;
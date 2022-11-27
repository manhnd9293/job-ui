import BaseModal from "../../../../component/base/modal/BaseModal";

const LargePhotoModal = ({imgSrc, show, setShow}) => {
  return (
    <BaseModal visible={show}
               setVisible={setShow}
    >
      <img src={imgSrc} style={{maxWidth: 1000, maxHeight: 1000}}/>
    </BaseModal>
  )
}

export default LargePhotoModal;
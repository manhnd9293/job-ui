import React from 'react';
import BaseCard from "../baseCard/baseCard";
import classes from "./baseModal.module.css";
import {FaTimes} from "react-icons/all";
import ReactDOM from "react-dom";

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(96,96,96,0.7)',
    zIndex: 1000,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const handleModalCLick = (e) => {
    e.stopPropagation();
}

const BaseModal = ({
                       children,
                       width, height,
                       header, footer,
                       visible, setVisible, persist
                   }) => {
    if (!visible) {
        return null;
    }
    const closeOnOverlayClick = e =>{
        if(!persist){
            setVisible(false);
        }
    }
    return ReactDOM.createPortal(
        <>
            <div onClick={closeOnOverlayClick} style={OVERLAY_STYLES}>
                <BaseCard width={width}
                          height={height}
                          onClick={handleModalCLick}
                >
                    {header && (
                        <>
                            <div className={classes.header}>
                                <h3>{header}</h3>
                                <span onClick={e => setVisible(false)}>
                                <FaTimes size={25} fontWeight={'lighter'}/>
                            </span>
                            </div>
                            <div className={'separator'}/>
                        </>
                        )}
                    {children}
                </BaseCard>
            </div>
        </>, document.getElementById("modal"));
};

export default BaseModal;
import React from 'react';
import classes from './baseCard.module.css'

const BaseCard = ({width, maxWidth, height,
                      onClick, children,
                      shadow, noPadding,
                      }) => {
    const widthStyle = width || '';
    const heightStyle = height || null;
    const noPaddling = noPadding ?? false;
    return (
        <div className={`${classes.card} ${shadow && classes.shadow}`}
             style={{
                 width: widthStyle,
                 height: heightStyle,
                 maxWidth: `${maxWidth ? maxWidth + 'px' : '' }`,
                 padding: `${noPaddling ? '0' : '15px'}`
             }}
             onClick={onClick}
        >
            {children}
        </div>
    )
};

export default BaseCard;
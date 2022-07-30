import { useState } from 'react';
import cx from 'classnames';

import styles from './HorizontalDragContainer.module.css';

const DISTANCE_TO_SCROLL = 75;

const HorizontalDragContainer = ({ children, className, callback }) => {
    const [clicking, setClicking] = useState(false);
    const [position, setPosition] = useState(0);

    const onMouseDown = (e) => {
        const pageX = e.pageX || e.touches[0].pageX;
        
        setPosition(pageX);
        setClicking(true);
    };

    const onMouseUp = () => {
        setClicking(false);
    };

    const onMouseMove = (e) => {
        const pageX = e.pageX || e.touches[0].pageX;
        
        if (clicking && Math.abs(pageX - position) > DISTANCE_TO_SCROLL) {
            setClicking(false);
            callback(pageX - position);
        }
    };

    const classNames = cx(styles.HorizontalDragContainer, className, {
        [styles['HorizontalDragContainer--clicking']]: clicking,
    });

    return (
        <div
            className={classNames}

            onTouchStart={onMouseDown}
            onTouchEnd={onMouseUp}
            onTouchMove={onMouseMove}
        >
            {children}
        </div>
    );
};

export default HorizontalDragContainer;
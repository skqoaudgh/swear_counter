import cx from 'classnames';

import styles from './IconButton.module.css';

const IconButton = ({ children, onClick, active }) => {
    const className = cx(styles.IconButton, {
        [styles['IconButton--active']]: active,
    });
    
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default IconButton;
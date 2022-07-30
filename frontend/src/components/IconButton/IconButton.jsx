import cx from 'classnames';

import styles from './IconButton.module.css';

const IconButton = ({ children, className, onClick, active }) => {
    const classNames = cx(styles.IconButton, className, {
        [styles['IconButton--active']]: active,
    });

    return (
        <button className={classNames} onClick={onClick}>
            {children}
        </button>
    );
};

export default IconButton;
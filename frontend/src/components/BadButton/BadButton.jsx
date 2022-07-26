import styles from './BadButton.module.css';

const BadButton = ({ children, onClick }) => {
    return (
        <div className={styles.BadButton}>
            <a className={styles.BadButton__content} onClick={onClick}>{children}</a>
        </div>
    );
};

export default BadButton;
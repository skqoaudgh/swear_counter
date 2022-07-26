import styles from './GoodButton.module.css';

const GoodButton = ({ children, onClick }) => {
    return (
        <div className={styles.GoodButton}>
            <a className={styles.GoodButton__content} onClick={onClick}>{children}</a>
        </div>
    );
};

export default GoodButton;
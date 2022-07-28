import Panel from '../Panel';

import USER from '../../constants/user';

import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.Home}>
            <Panel name={USER.YURA} />
            <Panel name={USER.MYUNGHO} />
        </div>
    );
};

export default Home;
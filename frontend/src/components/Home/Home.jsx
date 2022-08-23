import Panel from '../Panel';

import styles from './Home.module.css';

const Home = ({ users }) => (
    <div className={styles.Home}>
        {users.map((user) => (
            <Panel key={user._id} name={user.name} />
        ))}
    </div>
);

export default Home;
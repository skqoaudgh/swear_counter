import { useState, useEffect } from 'react';

import getAllUsers from '../../apis/getAllUsers';

import Panel from '../Panel';
import USER from '../../constants/user';

import styles from './Home.module.css';

const Home = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getAllUsers().then(({ data }) => {
            setUsers(data.result)
        });
    }, []);
    
    return (
        <div className={styles.Home}>
            {users.map((user) =>
                <Panel key={user._id} name={user.name} />
            )}
        </div>
    );
};

export default Home;
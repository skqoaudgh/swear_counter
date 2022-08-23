import { useState, useEffect } from 'react';
import './App.css';

import getAllUsers from './apis/getAllUsers';

import Header from './components/Header';
import Home from './components/Home';
import Chart from './components/Chart';

import PAGE from './constants/page';

function App() {
    const [page, setPage] = useState(PAGE.HOME);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getAllUsers().then(({ data }) => {
            setUsers(data.result)
        });
    }, []);

    return (
        <div className="App">
            <Header page={page} setPage={setPage} />
            {page === PAGE.HOME ? <Home users={users} /> : <Chart users={users} />}
        </div>
    );
}

export default App;
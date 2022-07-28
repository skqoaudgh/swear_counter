import { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Chart from './components/Chart';

import PAGE from './constants/page';

function App() {
    const [page, setPage] = useState(PAGE.HOME);

    return (
        <div className="App">
            <Header page={page} setPage={setPage} />
            {page === PAGE.HOME ? <Home /> : <Chart />}
        </div>
    );
}

export default App;
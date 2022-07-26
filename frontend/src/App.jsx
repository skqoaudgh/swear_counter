import { useState, useEffect } from 'react';
import './App.css';

import Panel from './components/Panel';

function App() {    
    return (
        <div className="App">
            <Panel name="유라" />
            <Panel name="명호" />
        </div>
    );
}

export default App;
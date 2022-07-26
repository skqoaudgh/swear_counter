import { useState } from 'react';
import './App.css';

import Panel from './components/Panel';
import ResetButton from './components/ResetButton';

import useCount from './hooks/useCount';

function App() {
    const { countA, increaseA, decreaseA, resetA } = useCount(0, 'A');
    const { countB, increaseB, decreaseB, resetB } = useCount(0, 'B');
    
    const reset = () => {
        resetA();
        resetB();
    };
    
    return (
        <div className="App">
            <Panel name="유라" count={countA} decrease={decreaseA} increase={increaseA} />
            <Panel name="명호" count={countB} decrease={decreaseB} increase={increaseB} />
            <ResetButton onClick={reset} />
        </div>
    );
}

export default App;
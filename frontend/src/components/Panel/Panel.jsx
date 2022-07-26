import GoodButton from '../GoodButton';
import BadButton from '../BadButton';

import styles from './Panel.module.css';

const COUNT_UNIT = 1000;

const Panel = ({ name, count, decrease, increase}) => {
    return (
    	<div>
        	<h1>{name}</h1>
            <h2>{count * COUNT_UNIT}￦</h2>
            <div className={styles.Panel__button}>
                <BadButton onClick={decrease}>-1</BadButton>
            	<GoodButton onClick={increase}>+1</GoodButton>
            </div>
        </div>
    );
};

export default Panel;
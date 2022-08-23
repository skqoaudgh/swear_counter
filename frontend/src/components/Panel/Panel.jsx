import { useState, useEffect } from 'react';

import GoodButton from '../GoodButton';
import BadButton from '../BadButton';

import getTotalCount from '../../apis/getTotalCount';
import updateCount from '../../apis/updateCount';

import { numberWithCommas } from '../../utils/number';

import styles from './Panel.module.css';

const COUNT_UNIT = 1000;

const Panel = ({ name }) => {
    const [count, setCount] = useState(0);

    const increase = () => {
        updateCount(name, count + 1);
        setCount(count + 1);
    };
    const decrease = () => {
        updateCount(name, count - 1);
        setCount(count - 1);
    };

    useEffect(() => {
        getTotalCount(name).then(({ data }) => {
            setCount(data.result);
        });
    }, []);

    return (
        <div className={styles.Panel}>
            <h1 className={styles.Panel__title}>{name}</h1>
            <h2>{numberWithCommas(count * COUNT_UNIT)}￦</h2>
            <div className={styles.Panel__button}>
                <BadButton onClick={decrease}>-1</BadButton>
                <GoodButton onClick={increase}>+1</GoodButton>
            </div>
        </div>
    );
};

export default Panel;
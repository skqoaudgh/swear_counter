import { useState, useEffect } from 'react';
import _throttle from 'lodash/throttle';

import GoodButton from '../GoodButton';
import BadButton from '../BadButton';

import getTotalCount from '../../apis/getTotalCount';
import updateCount from '../../apis/updateCount';
const update = _throttle(updateCount, 2000);

import styles from './Panel.module.css';

const COUNT_UNIT = 1000;

const Panel = ({ name }) => {
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
        update(name, count + 1);
    };
    const decrease = () => {
        setCount(count - 1);
        update(name, count - 1);
    };

    useEffect(() => {
        getTotalCount(name).then(({ data }) => {
            const today = new Date();
            const todayData = data.find((count) => {
                const date = new Date(count.date);
                
                return (
                    today.getFullYear() === date.getFullYear() &&
                    today.getMonth() === date.getMonth() &&
                    today.getDate() === date.getDate()
                );
            });

            setCount(todayData?.count ?? 0);
        });
    }, []);

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
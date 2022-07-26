import { useState } from 'react';

const useCount = (defaultCount, name) => {
    const [count, setCount] = useState(defaultCount);

    const increase = () => {
        setCount(count + 1);
    };
    const decrease = () => {
        setCount(count - 1);
    };
    const reset = () => {
        setCount(0);
    };

    return {
        [`count${name}`]: count,
        [`increase${name}`]: increase,
        [`decrease${name}`]: decrease,
        [`reset${name}`]: reset,
    };
};

export default useCount;
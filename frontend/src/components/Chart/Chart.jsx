import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { ReactComponent as LeftChevronIcon } from '../../assets/chevron-left.svg';
import { ReactComponent as RightChevronIcon } from '../../assets/chevron-right.svg';
import { ReactComponent as CircleIcon } from '../../assets/circle.svg';
import IconButton from '../IconButton';
import getWeekCount from '../../apis/getWeekCount';
import USER from '../../constants/user';

import styles from './Chart.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#fff',
                font: {
                    size: 16,
                },
            },
        },
        title: {
            display: true,
            text: '주간 욕설 횟수',
            color: '#fff',
            font: {
                size: 32,
            },
            padding: 32,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#fff',
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                drawBorder: false,
                color: '#555',
                borderDash: [5, 10],
                drawTicks: false,
                lineWidth: 2,
            },
            ticks: {
                padding: 12,
                stepSize: 1,
                color: '#fff',
            },
        },
    },
};

const Chart = () => {
    const today = new Date();

    const [date, setDate] = useState(today);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const initialChartData = {
            labels: null,
            datasets: [
                {
                    label: USER.YURA,
                    data: Array(7).fill(0),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: USER.MYUNGHO,
                    data: Array(7).fill(0),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };

        getWeekCount().then(({ data }) => {
            const firstDay = new Date(date.setDate(date.getDate() - date.getDay()));
            initialChartData.labels = Array(7)
                .fill()
                .map((_, index) =>
                    new Date(firstDay.setDate(firstDay.getDate() + 1)).getDate()
                );

            Object.values(USER).forEach((name) => {
                const current = data.filter((d) => d.name === name);
                const target = initialChartData.datasets.find((data) => data.label === name);

                current.forEach((d2) => {
                    const current = new Date(d2.date);

                    if (
                        current.getFullYear() === date.getFullYear() &&
                        current.getMonth() === date.getMonth()
                    ) {
                        const index = current.getDate() - date.getDate();
                        target.data[index] = d2.count;
                    }
                });
            });

            setChartData(initialChartData);
        });
    }, [date]);

    const onClickPrev = () => {
        const prevWeek = new Date(date.setDate(date.getDate() - 7));

        setDate(prevWeek);
    };

    const onClickNext = () => {
        const prevWeek = new Date(date.setDate(date.getDate() + 7));

        setDate(prevWeek);
    };

    const onClickToday = () => {
        setDate(today);
    };

    return (
        <div className={styles.Chart}>
            <div className={styles.Chart__buttons}>
                <div>
                    <IconButton className={styles.Chart__button} onClick={onClickPrev}>
                        <LeftChevronIcon />
                    </IconButton>
                    <span>{date.getMonth() + 1}월</span>
                    <IconButton className={styles.Chart__button} onClick={onClickNext}>
                        <RightChevronIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton className={styles.Chart__button} onClick={onClickToday}>
                        <CircleIcon />
                    </IconButton>
                </div>
            </div>
            {chartData && <Line options={options} data={chartData} />}
        </div>
    );
};

export default Chart;
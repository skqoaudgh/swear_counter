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

import { ReactComponent as CircleIcon } from '../../assets/circle.svg';

import IconButton from '../IconButton';
import HorizontalDragContainer from '../HorizontalDragContainer';

import getAccumulateCount from '../../apis/getAccumulateCount';
import getCountLog from '../../apis/getCountLog';

import USER from '../../constants/user';
import { injectAlphaToColor } from '../../utils/color';

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
        tooltip: {
            callbacks: {
                title: (items) => `${items[0].label}일`
            },
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

const Chart = ({ users }) => {
    const today = new Date();

    const [date, setDate] = useState(today);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const DateOfFirstDay = new Date(date);
        DateOfFirstDay.setDate(DateOfFirstDay.getDate() - DateOfFirstDay.getDay());
        const labels = Array(7)
            .fill()
            .map((_, index) => {
                const currentDate = new Date(DateOfFirstDay);
                currentDate.setDate(currentDate.getDate() + index);

                return currentDate.getDate();
            });

        const initialChartData = {
            labels,
            datasets: users.map((user) => ({
                label: user.name,
                data: Array(7).fill(0),
                borderColor: user.color,
                backgroundColor: injectAlphaToColor(user.color),
                pointHitRadius: 10,
            })),
        };

        Promise.all(
            Object.values(USER).map(async (name) => {
                const [
                    {
                        data: { result: countData },
                    },
                    {
                        data: { result: logData },
                    },
                ] = await Promise.all([
                    getAccumulateCount({ name, date }),
                    getCountLog({ name, date }),
                ]);
                const target = initialChartData.datasets.find((data) => data.label === name);
                target.data = countData;
                
                options.plugins.tooltip.callbacks.footer = (items) => {
                    const log = logData.find((log) => {
                        const date = log._id.date.split('-')[2];
                        
                        return date === items[0].label;
                    })
                    const string = log?.list?.map((item) => `${item.time} ${item.count}개`).join('\n') || null;
                    
                    return string;
                };
            })
        ).then(() => {
            setChartData(initialChartData);
        });
    }, [users, date]);

    const onClickToday = () => {
        setDate(today);
    };

    const onDrag = (value) => {
        const step = value < 0 ? 7 : -7;

        const newWeek = new Date(date.setDate(date.getDate() + step));
        setDate(newWeek);
    };

    return (
        <>
            <div className={styles.Chart__buttons}>
                <div>
                    <span>
                        {date.getMonth() + 1}월 {Math.ceil(date.getDate() / 7)}주차
                    </span>
                </div>
                <div>
                    <IconButton className={styles.Chart__button} onClick={onClickToday}>
                        <CircleIcon />
                    </IconButton>
                </div>
            </div>
            <HorizontalDragContainer className={styles.Chart} callback={onDrag}>
                {chartData && (
                    <>
                        <Line options={options} data={chartData} />
                    </>
                )}
            </HorizontalDragContainer>
        </>
    );
};

export default Chart;
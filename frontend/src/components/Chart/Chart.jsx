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
            const today = new Date();
            const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
            initialChartData.labels = Array(7)
                .fill()
                .map((_, index) => firstDay.getDate() + index);

            Object.values(USER).forEach((name) => {
                const current = data.filter((d) => d.name === name);
                const target = initialChartData.datasets.find((data) => data.label === name);
                current.forEach((d2) => {
                    const index = new Date(d2.date).getDate() - today.getDate();
                    target.data[index] = d2.count;
                });
            });

            setChartData(initialChartData);
        });
    }, []);

    return <div className={styles.Chart}>{chartData && <Line options={options} data={chartData} />}</div>;
};

export default Chart;
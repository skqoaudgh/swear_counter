import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import schedule from 'node-schedule';

import userRouter from './routes/user.js';
import countRouter from './routes/count.js';
import countLogRouter from './routes/countLog.js';
import modUser from './models/user.js';
import serCount from './services/count.js';

const app = express();

const whitelist = [
    'https://swear-counter.run.goorm.io',
    'https://swear-counter-dev.run.goorm.io',
    'http://swear-counter.run.goorm.io',
    'http://swear-counter-dev.run.goorm.io',
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://0.0.0.0:27017')
    .then(() => console.log('Successfully connected to mongodb'))
    .catch((e) => console.error(e));

app.use(cors(corsOptions));
app.use(express.json());
express.urlencoded({ extended: false });
app.use('/users', userRouter);
app.use('/counts', countRouter);
app.use('/count-logs', countLogRouter);

app.listen(3000, () => {
    console.log('Listen');
});

schedule.scheduleJob('0 0 * * *', () => {
    modUser.findAllUsers().then((result) => {
        const users = result.map((user) => user.name);
        const date = new Date();
        
        console.log(users.toString(), ' added in ', date);

        Promise.all(users.map((name) => serCount.createCount(name, date)));
    });
});
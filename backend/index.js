import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import countRouter from './routes/count.js';

const app = express();

const whitelist = ['https://swear-counter.run.goorm.io', 'https://swear-counter-dev.run.goorm.io'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!whitelist.includes(origin)) {
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
app.use('/count', countRouter);

app.listen(3000, () => {
    console.log('Listen');
});
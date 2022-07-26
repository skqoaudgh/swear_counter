import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import countRouter from './routes/count.js';

const app = express();

mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://0.0.0.0:27017')
    .then(() => console.log('Successfully connected to mongodb'))
    .catch((e) => console.error(e));

app.use(cors({ origin: 'https://swear-count.run.goorm.io', credentials: true }));
app.use(express.json());
express.urlencoded({ extended: false });
app.use('/count', countRouter);

app.listen(3000, () => {
    console.log('Listen');
});
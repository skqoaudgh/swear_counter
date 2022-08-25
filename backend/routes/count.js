import express from 'express';

import Count from '../models/count.js';
import serCount from '../services/count.js';

const router = express.Router();

router.get('/:name', (req, res) => {
    const { name } = req.params;
    const { type, date } = req.query;

    try {
        if (type === 'sum') {
            serCount.getTotalCountByName({ name }).then((result) => {
                return res.send({ result });
            });
        } else if (type === 'accumulate') {
            serCount.getWeekCountByName({ name, date }).then((result) => {
                return res.send({ result });
            });
        } else {
            serCount.getRawDataByName({ name }).then((result) => {
                return res.send({ result });
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/:name', (req, res) => {
    const { name } = req.params;
    const { count } = req.body;

    serCount
        .updateCount({ name, date: new Date(), count })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(500).send(err));
});

export default router;
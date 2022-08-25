import express from 'express';

import serCountLog from '../services/countLog.js';

const router = express.Router();

router.get('/:name', (req, res) => {
    const { name } = req.params;
    const { date } = req.query;

    try {
        serCountLog.getWeekCountLogByName({ name, date }).then((result) => {
            return res.send({ result });
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
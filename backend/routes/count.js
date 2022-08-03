import express from 'express';
import Count from '../models/count.js';

const router = express.Router();

router.get('/', (req, res) => {
    const { type, date } = req.query;

    Count.findAll({ type, date })
        .then((counts) => {
            res.send(counts);
        })
        .catch((err) => res.status(500).send(err));
});

router.get('/:name', (req, res) => {
    const { name } = req.params;
    const { type } = req.query;

    Count.findByName(name, { type })
        .then((counts) => {
        	if(type === 'sum') {
                const sum = counts.reduce((acc, cur) => acc + cur.count, 0);
                
                res.send({ result: sum });
            } else {
                res.send({ result: counts });
            }
        })
        .catch((err) => res.status(500).send(err));
});

router.post('/:name', (req, res) => {
    const { name } = req.params;
    const { count } = req.body;

    const payload = {
        name,
        count,
    };

    Count.updateByName(name, payload)
        .then((counts) => {
            res.send(counts);
        })
        .catch((err) => res.status(500).send(err));
});

export default router;
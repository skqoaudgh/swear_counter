import express from 'express';

import User from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        User.findAllUsers().then((result) => {
            return res.send({ result });
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    try {
        User.findById({ id }).then((result) => {
            return res.send({ result });
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
const express = require('express');

module.exports.create = (repo) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        repo.getPage()
            .then((results) => {
                res.json(results);
            });
    });

    router.get('/:id', (req, res) => {
        repo.get(req.params.id)
            .then((results) => {
                res.json(results);
            });
    });

    return router;
};

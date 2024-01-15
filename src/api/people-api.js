const express = require('express');

module.exports.create = (repo) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        repo.people.getPage(req.query.page || 1, req.query.pageSize || 25)
            .then((results) => {
                res.json(results);
            });
    });

    router.get('/:id', (req, res) => {
        repo.people.get(req.params.id)
            .then((results) => {
                res.json(results);
            });
    });

    return router;
};

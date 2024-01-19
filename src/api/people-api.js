const express = require('express');

module.exports.create = (repo) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const { page = 1, pageSize = 25, ...rest } = req.query;
    repo.people.getPage(page, pageSize, rest)
      .then((results) => {
        res.json(results);
      });
  });

  router.get('/:id', (req, res) => {
    repo.people.get(req.params.id, req.query[repo.people.partitionField])
      .then((results) => {
        res.json(results);
      });
  });

  router.post('/', (req, res) => {
    repo.people.create(req.body)
      .then((results) => {
        res.json(results);
      });
  });

  router.put('/:id', (req, res) => {
    repo.people.update(req.params.id, req.query[repo.people.partitionField], req.query.etag, req.body)
      .then((results) => {
        res.json(results);
      });
  });

  router.delete('/:id', (req, res) => {
    repo.people.delete(req.params.id, req.query[repo.people.partitionField], req.query.etag)
      .then(() => res.sendStatus(200));
  });

  return router;
};

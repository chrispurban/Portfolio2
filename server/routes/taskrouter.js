const parser = require('body-parser');
const express = require('express');
const router = express.Router().use(parser.json());

const TaskModel = require('../models/task');

router
  .route('/') // this is to get all tasks
  .get((req,res,next) => {
    TaskModel
      .find(req.query)
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    TaskModel
      .create(req.body)
      .then(
        (task) => {
          console.log('Task Created ', task);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    TaskModel
      .remove({})
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .all((req, res, next) => {
      res.statusCode = 405; // method not allowed
      res.redirect('./');
  })
;

router
  .route('/:taskId')
  .options((req, res) => { res.sendStatus(200);})
  .get((req,res,next) => {
    TaskModel
    .findById(req.params.taskId)
    .then(
      (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
  })
  .put((req, res, next) => {
    TaskModel
    .findByIdAndUpdate(req.params.taskId, {$set: req.body}, {new: true})
    .then(
      (task) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(task);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    TaskModel
      .findByIdAndRemove(req.params.taskId)
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .all((req, res, next) => {
      res.statusCode = 405; // method not allowed
      res.redirect('./');
  })
;

module.exports = router;

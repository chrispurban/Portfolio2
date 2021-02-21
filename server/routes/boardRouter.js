const config = require('../config');
const router = require('express').Router();
const cors = require('cors');
const auth = require('../auth');
const BoardModel = require('../models/board');

router
  .use(require('body-parser').json())
;

router
  .route('/')
  .options(cors(config.whitelist), (req,res,next)=>{res.sendStatus(200);})
  .get(cors(), auth.user, (req,res,next) => {
    console.log(">>> " + req.user.sub)
    BoardModel
      .find({owner:req.user.sub})
//      .populate('tasks')
      .then(
        (board) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(board);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
      /*
    */
  })
;

/*

router
  .route('/:boardId')
;

router
  .route('/:boardId/tasks') // this is to get all tasks
  .options(cors(config.whitelist), (req,res,next)=>{res.sendStatus(200);})
  .get(cors(), auth.user, (req,res,next) => {
    BoardModel
      .find({owner:req.user.sub})
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
  .post(cors(config.whitelist), auth.user, (req, res, next) => {
    req.body.owner = req.user.sub;
    if(req.body._id){delete req.body._id;} // purge any local ID it may have had
    BoardModel
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
  .delete(cors(config.whitelist), auth.user, (req, res, next) => {
    BoardModel
      .remove({owner:req.user.sub})
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
  .route('/:boardId/tasks/:taskId')
  .options(cors(config.whitelist), auth.user, (req,res,next)=>{res.sendStatus(200);})
  .get(cors(), (req,res,next) => {
    BoardModel
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
  .put(cors(config.whitelist), auth.user, (req, res, next) => {
    if(req.body.history){
      req.body['$push'] = {history:req.body.history};
      delete req.body.history;
      console.log(req.body);
    }
    BoardModel
      .updateOne({"_id":req.params.taskId}, req.body)
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
          console.log(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors(config.whitelist), auth.user, (req, res, next) => {
    BoardModel
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

*/

module.exports = router;

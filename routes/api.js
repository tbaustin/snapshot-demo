var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/:resource', function(req, res, next) {
  const { resource } = req.params;

  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource: ' + resource
    });
    return;
  }

  controller
    .get(req.query, false)
    .then(results => {
      res.json({
        confirmation: 'success',
        results: results
      });
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err
      });
    });
});

router.get('/:resource/:id', (req, res, next) => {
  const { resource, id } = req.params;

  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource: ' + resource
    });
    return;
  }

  controller
    .getById(id, false)
    .then(result => {
      res.json({
        confirmation: 'success',
        result: result
      });
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: 'Not Found'
      });
    });
});

router.post('/:resource', (req, res, next) => {
  const { resource } = req.params;

  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource: ' + resource
    });
    return;
  }

  controller
    .post(req.body, false)
    .then(result => {
      res.json({
        confirmation: 'success',
        result: result
      });
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err
      });
    });
});

module.exports = router;

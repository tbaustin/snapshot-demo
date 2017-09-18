var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var controllers = require('../controllers');

router.get('/:action', function(req, res, next) {
  const { action } = req.params;

  if (action == 'currentuser') {
    if (req.session == null) {
      res.json({
        confirmation: 'success',
        user: null
      });
      return;
    }

    if (req.session.user == null) {
      res.json({
        confirmation: 'success',
        user: null
      });
      return;
    }

    controllers.profile
      .getById(req.session.user, false)
      .then(user => {
        res.json({
          confirmation: 'success',
          user: user
        });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err
        });
      });
  }

  if (action == 'logout') {
    req.session.reset();
    res.json({
      confirmation: 'success',
      message: 'Sorry to see you go'
    });
  }
});

router.post('/:action', function(req, res, next) {
  const { action } = req.params;

  if (action == 'register') {
    controllers.profile
      .post(req.body, false)
      .then(profile => {
        req.session.user = profile.id; // set the session
        res.json({
          confirmation: 'success',
          user: profile
        });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err
        });
      });
  }

  if (action == 'login') {
    controllers.profile
      .get({ username: req.body.username }, true)
      .then(profiles => {
        if (profiles.length == 0) {
          res.json({
            confirmation: 'fail',
            message: 'Profile not found'
          });
          return;
        }
        const profile = profiles[0];
        const passwordCorrect = bcrypt.compareSync(
          req.body.password,
          profile.password
        );

        if (passwordCorrect == false) {
          res.json({
            confirmation: 'fail',
            message: 'Wrong Password'
          });

          return;
        }

        req.session.user = profile._id;
        res.json({
          confirmation: 'success',
          user: profile.summary()
        });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err
        });
      });
  }
});

module.exports = router;

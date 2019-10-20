var users = require('../controllers/users.server.controller.js'),
express = require('express'),
router = express.Router();

router.route('/')
  .get(users.get_users)
  .post(users.add_user);

router.route('/user')
  .post(users.join_study_spot);

router.route('/deletespot')
  .post(users.leave_study_spot);

router.route('/likespot')
  .post(users.like_spot);

router.route('/dislikespot')
  .post(users.dislike_spot);

module.exports = router;

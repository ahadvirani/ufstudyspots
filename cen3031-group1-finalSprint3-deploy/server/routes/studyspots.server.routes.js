var studyspots = require('../controllers/studyspots.server.controller.js'),
express = require('express'),
router = express.Router();

router.route('/')
  .post(studyspots.add_study_spot)
  .get(studyspots.get_study_spot);

router.route('/studyspot')
  .post(studyspots.add_user);

router.route('/removeuser')
  .post(studyspots.remove_user);

router.route('/likespot')
  .post(studyspots.like_spot);

router.route('/dislikespot')
  .post(studyspots.dislike_spot);

module.exports = router;

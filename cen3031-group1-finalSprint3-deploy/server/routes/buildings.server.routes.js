var buildings = require('../controllers/buildings.server.controller.js'),
express = require('express'),
router = express.Router();

router.route('/')
  .get(buildings.buildings)
  .post(buildings.add_study_spot);

module.exports = router;

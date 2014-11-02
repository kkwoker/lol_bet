'use strict';

var express = require('express');
var controller = require('./match.controller');

var router = express.Router();


router.get('/gameCompletion/:id', controller.gameCompletion);


router.get('/', controller.index);
router.get('/reset', controller.clearMatches);
router.get('/:id', controller.show);
router.get('/search/:indexName', controller.search);
router.get('/summoner/:summonerName', controller.getMatchesBySummoner);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);



module.exports = router;
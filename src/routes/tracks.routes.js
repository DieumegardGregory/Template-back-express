const tracksRouter = require('express').Router();
const { tracksControllers } = require('../controllers');

tracksRouter.get('/', tracksControllers.findManyTracks);
tracksRouter.get('/:id', tracksControllers.findOneTrackById);
tracksRouter.post('/', tracksControllers.createOneTrack);
tracksRouter.put('/:id', tracksControllers.updateOneTrack, tracksControllers.findOneTrackById);
tracksRouter.delete('/:id', tracksControllers.deleteOneTrack);

module.exports = tracksRouter;
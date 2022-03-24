const mainRouter = require('express').Router();
const playlistsRouter = require('./playlists.routes');
const tracksRouter = require('./tracks.routes');

mainRouter.use('/playlists', playlistsRouter);
mainRouter.use('/tracks', tracksRouter);

module.exports = mainRouter;
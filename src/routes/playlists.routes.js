
const playlistsRouter = require('express').Router();
const { playlistsControllers } = require('../controllers');

playlistsRouter.get('/', playlistsControllers.findManyPlaylists);
playlistsRouter.get('/:id', playlistsControllers.findOnePlaylistById);
playlistsRouter.post('/', playlistsControllers.createOnePlaylist);
playlistsRouter.put('/:id', playlistsControllers.updateOnePlaylist , playlistsControllers.findOnePlaylistById);
playlistsRouter.delete('/:id', playlistsControllers.deleteOnePlaylist);

module.exports = playlistsRouter;



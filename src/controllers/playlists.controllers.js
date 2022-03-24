const { Playlist } = require('../models');

const findManyPlaylists = async (req, res) => {
  const { title, genre } = req.query;
  let filters = { title, genre };
  try {
    const [results] = await Playlist.findMany(filters);
    if (results.length === 0) {
      res.status(200).send('Aucune playlist disponible');
    } else {
      res.status(200).json(results)
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
}

const findOnePlaylistById = async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(parseInt(id, 10))) {
    res.status(400).send('Vous devez renseigner une ID valide');
  } 
    try {
      const [results] = await Playlist.findOneById(id);
      if (results.length === 0) {
      res.status(400).send(`La playlist avec l'id ${id} n'a pas été trouvée!`);
    } else {
      res.status(200).json(results[0]);
    } 
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const createOnePlaylist = async (req, res) => {
  const playlist = req.body;
  const statusCode = res.method === "POST" ? "201" : "200";
  try {
    const [result] = await Playlist.createOne(playlist);
    if (result.affectedRows === 0) {
      res.status(400).send('La requête a échouée');
    } else {
      res.status(200).send('Playlist créée avec succès');
    }
  } catch (err) {
  res.status(500).send(err.message);
  }
}

const updateOnePlaylist = async (req, res, next) => {
  const { id } = req.params;
  const { title, genre } = req.body;
  let newPlaylist = {};
  if (title) {
    newPlaylist.title = title;
  }
  if (genre) {
    newPlaylist.genre = genre;
  }
  try {
    const [result] = await Playlist.updateOne(id, newPlaylist);
    if (result.affectedRows === 0) {
      res.status(404).send('La requête a échouée');
    } else {
      next();
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
};

const deleteOnePlaylist = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await Playlist.deleteOne(id);
    if (results.affectedRows > 0) {
      res.status(204).send('Playlist effacée avec succès');
    } else {
      res.status(404).send(`La Playlist avec l'id ${id} n'a pas été trouvée`)
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  findManyPlaylists,
  findOnePlaylistById,
  createOnePlaylist,
  updateOnePlaylist,
  deleteOnePlaylist,
}
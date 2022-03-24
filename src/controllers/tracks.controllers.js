const { Track } = require('../models');

const findManyTracks = async (req, res) => {
  try {
    const [results] = await Track.findMany();
    console.log(results)
    if (results.length === 0) {
      res.status(200).send('Aucune piste disponible');
    } else {
      res.status(200).json(results)
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
}

const findOneTrackById = async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(parseInt(id, 10))) {
    res.status(400).send('Vous devez renseigner une ID valide');
  } 
    try {
      const [results] = await Track.findOneById(id);
      if (results.length === 0) {
      res.status(400).send(`La piste avec l'id ${id} n'a pas été trouvée!`);
    } else {
      res.status(200).json(results[0]);
    } 
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const createOneTrack = async (req, res) => {
  const track = req.body;
  try {
    const [result] = await Track.createOne(track);
    if (result.affectedRows === 0) {
      res.status(400).send('La requête a échouée');
    } else {
      res.status(201).send('Piste créée avec succès');
    }
  } catch (err) {
  res.status(500).send(err.message);
  }
}

const updateOneTrack = async (req, res, next) => {
  const { id } = req.params;
  const { title, artist } = req.body;
  let newTrack = {};
  if (title) {
    newTrack.title = title;
  }
  if (artist) {
    newTrack.artist = artist;
  }
  try {
    const [result] = await Track.updateOne(id, newTrack);
    if (result.affectedRows === 0) {
      res.status(404).send('La requête a échouée');
    } else {
      next();
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
};

const deleteOneTrack = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await Track.deleteOne(id);
    if (results.affectedRows > 0) {
      res.status(204).send('Piste effacée avec succès');
    } else {
      res.status(404).send(`La piste avec l'id ${id} n'a pas été trouvée`)
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
module.exports = {
  findManyTracks,
  findOneTrackById,
  createOneTrack,
  updateOneTrack,
  deleteOneTrack,
}
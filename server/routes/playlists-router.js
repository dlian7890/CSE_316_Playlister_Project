const express = require('express');
const PlaylistController = require('../controllers/playlist-controller');
const router = express.Router();
const auth = require('../auth');

router.post('/playlist', auth.verify, PlaylistController.createPlaylist);
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist);
router.get('/playlists', auth.verify, PlaylistController.getPlaylistsByUser);
router.get('/publishedPlaylists', PlaylistController.getPublishedPlaylists);
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist);

module.exports = router;

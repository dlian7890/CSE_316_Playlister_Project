import axios from 'axios';
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const createPlaylist = (newListName, newSongs, userEmail) => {
  return api.post(`/playlist/`, {
    name: newListName,
    songs: newSongs,
    ownerEmail: userEmail,
    isPublished: false,
    publishDate: new Date(),
    listensCount: 0,
    likesCount: 0,
    dislikesCount: 0,
    comments: [],
    interactedUsers: [],
  });
};
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`);
export const getPlaylistsByUser = () => api.get(`/playlists/`);
export const getPublishedPlaylists = () => api.get(`/playlists/`);
export const updatePlaylistById = (id, playlist) => {
  return api.put(`/playlist/${id}`, {
    playlist: playlist,
  });
};

const apis = {
  createPlaylist,
  deletePlaylistById,
  getPublishedPlaylists,
  updatePlaylistById,
  updatePlaylistById,
};

export default apis;

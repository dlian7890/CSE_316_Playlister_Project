import axios from 'axios';
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const createPlaylist = (
  newListName,
  newSongs,
  ownerUsername,
  ownerEmail
) => {
  return api.post(`/playlist/`, {
    name: newListName,
    songs: newSongs,
    ownerUsername: ownerUsername,
    ownerEmail: ownerEmail,
    isPublished: false,
    publishDate: new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
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
  getPlaylistsByUser,
  getPublishedPlaylists,
  updatePlaylistById,
};

export default apis;

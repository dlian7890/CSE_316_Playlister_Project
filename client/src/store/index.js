import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsTPS from '../common/jsTPS';
import api from './store-request-api';
import AuthContext from '../auth';
import CreateSong_Transaction from '../transactions/CreateSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';

export const GlobalStoreContext = createContext({});
console.log('create GlobalStoreContext');

const tps = new jsTPS();

export const GlobalStoreActionType = {
  LOAD_PLAYLISTS: 'LOAD_PLAYLISTS',
  SELECT_LIST: 'SELECT_LIST',
  OPEN_LIST: 'OPEN_LIST',
  CREATE_NEW_LIST: 'CREATE_NEW_LIST',
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  DELETE_SONG: 'DELETE_SONG',
  EDIT_SONG: 'EDIT_SONG',
  SET_MODAL: 'SET_MODAL',
  PLAY_SONG: 'PLAY_SONG',
  SET_SORT_BY: 'SET_SORT_BY',
};

export const CurrentModal = {
  NONE: 'NONE',
  DELETE_LIST: 'DELETE_LIST',
  EDIT_SONG: 'EDIT_SONG',
  DELETE_SONG: 'DELETE_SONG',
};

export const CurrentScreen = {
  HOME: 'HOME',
  ALLPLAYLISTS: 'ALLPLAYLISTS',
  USERS: 'USERS',
};

const GlobalStoreContextProvider = (props) => {
  const [store, setStore] = useState({
    currentScreen: '',
    currentModal: CurrentModal.NONE,
    visiblePlaylists: [],
    selectedList: null,
    openedList: null,
    selectedSongIndex: -1,
    selectedSong: null,
    songPlayingIndex: -1,
    sortBy: '',
    searchText: '',
  });
  const navigate = useNavigate();

  console.log('inside useGlobalStore');

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);
  console.log('auth: ' + auth);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.LOAD_PLAYLISTS: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: CurrentModal.NONE,
          visiblePlaylists: payload.playlists,
          selectedList: store.selectedList,
          openedList: store.openedList,
          selectedSongIndex: -1,
          selectedSong: null,
          songPlayingIndex: store.songPlayingIndex,
          sortBy: store.sortBy,
          searchText: payload.searchText,
        });
      }
      case GlobalStoreActionType.OPEN_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          openedList: payload.playlist,
          selectedSongIndex: -1,
          selectedSong: null,
          songPlayingIndex: payload.index,
          sortBy: store.sortBy,
          searchText: store.searchText,
        });
      }
      case GlobalStoreActionType.SELECT_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: payload,
          openedList: store.openedList,
          selectedSongIndex: -1,
          selectedSong: null,
          songPlayingIndex: store.songPlayingIndex,
          sortBy: store.sortBy,
          searchText: store.searchText,
        });
      }
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: payload,
          selectedList: null,
          openedList: store.openedList,
          selectedSongIndex: -1,
          selectedSong: null,
          songPlayingIndex: store.songPlayingIndex,
          sortBy: store.sortBy,
          searchText: store.searchText,
        });
      }
      case GlobalStoreActionType.SET_CURRENT_SCREEN: {
        return setStore({
          currentScreen: payload.screen,
          currentModal: CurrentModal.NONE,
          visiblePlaylists: payload.playlists,
          selectedList: null,
          openedList: null,
          selectedSongIndex: -1,
          selectedSong: null,
          songPlayingIndex: null,
          sortBy: '',
          searchText: '',
        });
      }
      case GlobalStoreActionType.DELETE_SONG: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: CurrentModal.DELETE_SONG,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          openedList: store.openedList,
          selectedSongIndex: payload.index,
          selectedSong: payload.song,
          songPlayingIndex: store.songPlayingIndex,
          sortBy: store.sortBy,
          searchText: store.searchText,
        });
      }
      case GlobalStoreActionType.EDIT_SONG: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: CurrentModal.EDIT_SONG,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          openedList: store.openedList,
          selectedSongIndex: payload.index,
          selectedSong: payload.song,
          songPlayingIndex: store.songPlayingIndex,
          sortBy: store.sortBy,
          searchText: store.searchText,
        });
      }
      case GlobalStoreActionType.SET_MODAL: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: payload,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          openedList: store.openedList,
          selectedSongIndex: -1,
          selectedSong: null,
          songPlayingIndex: store.songPlayingIndex,
          sortBy: store.sortBy,
          searchText: store.searchText,
        });
      }
      case GlobalStoreActionType.PLAY_SONG: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          openedList: store.openedList,
          selectedSongIndex: store.selectedSongIndex,
          selectedSong: store.selectedSong,
          songPlayingIndex: payload,
          sortBy: store.sortBy,
          searchText: store.searchText,
        });
      }
      case GlobalStoreActionType.SET_SORT_BY: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: payload.playlists,
          selectedList: store.selectedList,
          openedList: store.openedList,
          selectedSongIndex: store.selectedSongIndex,
          selectedSong: store.selectedSong,
          songPlayingIndex: store.selectedSong,
          sortBy: payload.sortType,
          searchText: store.searchText,
        });
      }
      default:
        return store;
    }
  };

  store.setScreen = async (screen) => {
    let response = null;
    if (screen === 'HOME') response = await api.getPlaylistsByUser();
    else response = await api.getPublishedPlaylists();

    if (response.data.success) {
      let playlists = response.data.playlists;
      storeReducer({
        type: GlobalStoreActionType.SET_CURRENT_SCREEN,
        payload: { screen: screen, playlists: playlists },
      });
    } else {
      console.log('API FAILED TO GET THE USERS LISTS');
    }
  };

  store.setSortBy = async (sortType) => {
    let response = null;
    if (store.currentScreen === 'HOME')
      response = await api.getPlaylistsByUser();
    else response = await api.getPublishedPlaylists();

    if (response.data.success) {
      storeReducer({
        type: GlobalStoreActionType.SET_SORT_BY,
        payload: {
          sortType,
          playlists: store.sortPlaylist(sortType, response.data.playlists),
        },
      });
    }
  };

  store.loadLists = async () => {
    let response = null;
    if (store.currentScreen === 'HOME')
      response = await api.getPlaylistsByUser();
    else response = await api.getPublishedPlaylists();

    if (response.data.success) {
      let playlists = response.data.playlists;
      storeReducer({
        type: GlobalStoreActionType.LOAD_PLAYLISTS,
        payload: {
          playlists: store.sortPlaylist(store.sortBy, playlists),
          searchText: store.searchText,
        },
      });
    } else {
      console.log('API FAILED TO GET THE USERS LISTS');
    }
  };

  store.sortPlaylist = (sortType, playlist) => {
    let sortedPlaylist = playlist;
    if (sortType !== '')
      switch (sortType) {
        case 'NAME': {
          sortedPlaylist = playlist.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case 'LIKES': {
          sortedPlaylist = playlist.sort((a, b) => {
            if (a.likesCount > b.likesCount) {
              return -1;
            }
            if (a.likesCount < b.likesCount) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case 'DISLIKES': {
          sortedPlaylist = playlist.sort((a, b) => {
            if (a.dislikesCount > b.dislikesCount) {
              return -1;
            }
            if (a.dislikesCount < b.dislikesCount) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case 'LISTENS': {
          sortedPlaylist = playlist.sort((a, b) => {
            if (a.listensCount > b.listensCount) {
              return -1;
            }
            if (a.listensCount < b.listensCount) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case 'PUBLISH_DATE': {
          sortedPlaylist = playlist.sort((a, b) => {
            return new Date(b.publishDate) - new Date(a.publishDate);
          });
          break;
        }
        case 'CREATION_DATE': {
          // sortedPlaylist = playlist.sort((a, b) => {
          //   console.log(new Date(b.createdAt) - new Date(a.createdAt));
          //   return new Date(a.createdAt) - new Date(b.createdAt);
          // });
          break;
        }
        case 'EDIT_DATE': {
          sortedPlaylist = playlist.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });
          break;
        }
      }
    return sortedPlaylist;
  };
  // store.loadPublishedLists = async () => {
  //   const asyncLoadPublishedLists = async () => {
  //     const response = await api.getPublishedPlaylists();
  //     if (response.data.success) {
  //       let visiblePlaylists = response.data.playlists;
  //       console.log(visiblePlaylists);
  //       storeReducer({
  //         type: GlobalStoreActionType.LOAD_PLAYLISTS,
  //         payload: visiblePlaylists,
  //       });
  //     } else {
  //       console.log('API FAILED TO GET PUBLISHED LISTS');
  //     }
  //   };
  //   asyncLoadPublishedLists();
  // };

  store.setModal = (modalType) => {
    storeReducer({
      type: GlobalStoreActionType.SET_MODAL,
      payload: modalType,
    });
  };

  store.isDeleteListModalOpen = () => {
    return store.currentModal === CurrentModal.DELETE_LIST;
  };
  store.isDeleteSongModalOpen = () => {
    return store.currentModal === CurrentModal.DELETE_SONG;
  };
  store.isEditSongModalOpen = () => {
    return store.currentModal === CurrentModal.EDIT_SONG;
  };

  store.createNewList = async () => {
    let newListName = 'Untitled';
    let ownerUsername = auth.user.username;
    let ownerEmail = auth.user.email;
    let playlistWSameName = store.visiblePlaylists.filter((playlist) => {
      return playlist.name === newListName;
    });
    while (playlistWSameName.length > 0) {
      newListName += '(1)';
      playlistWSameName = store.visiblePlaylists.filter((playlist) => {
        return playlist.name === newListName;
      });
      console.log(playlistWSameName.length);
    }
    const response = await api.createPlaylist(
      newListName,
      [],
      ownerUsername,
      ownerEmail
    );
    console.log('createNewList response: ' + response);
    if (response.status === 201) {
      let newList = response.data.playlist;
      store.loadLists();
    } else {
      console.log('API FAILED TO CREATE A NEW LIST');
    }
  };

  store.deleteList = (id) => {
    async function processDelete(id) {
      let response = await api.deletePlaylistById(id);
      store.loadLists();
    }
    processDelete(id);
  };

  store.duplicateList = async (playlist) => {
    let newListName = 'Copy of ' + playlist.name;
    let ownerUsername = auth.user.username;
    let ownerEmail = auth.user.email;
    let songs = playlist.songs;
    let getPlaylistResponse = await api.getPlaylistsByUser();
    let usersPlaylists = getPlaylistResponse.data.playlists;
    console.log(usersPlaylists);
    let playlistWSameName = usersPlaylists.filter((playlist) => {
      return playlist.name === newListName;
    });
    while (playlistWSameName.length > 0) {
      newListName += '(1)';
      playlistWSameName = usersPlaylists.filter((playlist) => {
        return playlist.name === newListName;
      });
      console.log(playlistWSameName.length);
    }
    const response = await api.createPlaylist(
      newListName,
      songs,
      ownerUsername,
      ownerEmail
    );
    console.log('createNewList response: ' + response);
    if (response.status === 201) {
      let newList = response.data.playlist;
      store.loadLists();
    } else {
      console.log('API FAILED TO CREATE A NEW LIST');
    }
  };

  store.openList = (playlist, index) => {
    console.log(index);
    storeReducer({
      type: GlobalStoreActionType.OPEN_LIST,
      payload: { playlist: playlist, index: index },
    });
    if (playlist.isPublished && playlist !== store.openedList) {
      console.log('BYE');
      store.listen(playlist);
    }
  };

  store.selectList = (playlist) => {
    storeReducer({
      type: GlobalStoreActionType.SELECT_LIST,
      payload: playlist,
    });
    store.clearAllTransactions();
  };

  store.updateSelectedList = () => {
    console.log(store.selectedList);
    const asyncUpdateSelectedList = async () => {
      const response = await api.updatePlaylistById(
        store.selectedList._id,
        store.selectedList
      );
      if (response.data.success) {
        store.loadLists();
      }
    };
    asyncUpdateSelectedList();
  };

  store.changeListName = (playlist, newName) => {
    let updatedPlaylist = playlist;
    updatedPlaylist.name = newName;
    const updateList = async (playlist) => {
      let response = await api.updatePlaylistById(
        playlist._id,
        updatedPlaylist
      );
      if (response.data.success) {
        store.loadLists();
      }
    };
    updateList(playlist);
  };

  store.publishList = () => {
    let list = store.selectedList;
    list.isPublished = true;
    list.publishDate = new Date();
    store.updateSelectedList();
  };

  store.createSong = (index, song) => {
    let list = store.selectedList;
    list.songs.splice(index, 0, song);
    store.updateSelectedList();
  };

  store.addNewSong = () => {
    let playlistSize = store.selectedList.songs.length;
    let song = {
      title: 'Untitled',
      artist: '?',
      youTubeId: 'dQw4w9WgXcQ',
    };
    store.addCreateSongTransaction(playlistSize, song);
    // store.createSong(playlistSize, song);
  };

  store.deleteSong = (index) => {
    let list = store.selectedList;
    list.songs.splice(index, 1);
    store.updateSelectedList();
  };

  store.editSong = (index, newSong) => {
    let list = store.selectedList;
    let song = list.songs[index];
    song.title = newSong.title;
    song.artist = newSong.artist;
    song.youTubeId = newSong.youTubeId;

    store.updateSelectedList();
  };

  store.moveSong = (start, end) => {
    let list = store.selectedList;
    if (start < end) {
      let temp = list.songs[start];
      for (let i = start; i < end; i++) {
        list.songs[i] = list.songs[i + 1];
      }
      list.songs[end] = temp;
    } else if (start > end) {
      let temp = list.songs[start];
      for (let i = start; i > end; i--) {
        list.songs[i] = list.songs[i - 1];
      }
      list.songs[end] = temp;
    }

    store.updateSelectedList();
  };

  store.playSong = (index) => {
    storeReducer({ type: GlobalStoreActionType.PLAY_SONG, payload: index });
  };

  store.addComment = (text) => {
    let comment = { username: auth.user.username, text: text };
    let playlist = store.openedList;
    playlist.comments.push(comment);
    const updateList = async (playlist) => {
      let response = await api.updatePlaylistById(playlist._id, playlist);
      if (response.data.success) {
        console.log('Comment Added');
      }
    };
    updateList(playlist);
    store.openList(playlist, store.songPlayingIndex);
  };

  store.likeOrDislikePlaylist = (like, playlist) => {
    let updatedPlaylist = playlist;
    let interactedUsers = playlist.interactedUsers.filter((interaction) => {
      return interaction.username === auth.user.username;
    });
    console.log(interactedUsers);

    if (interactedUsers.length === 0) {
      if (like) {
        let interaction = { username: auth.user.username, liked: true };
        playlist.interactedUsers.push(interaction);
        playlist.likesCount++;
      } else {
        let interaction = { username: auth.user.username, liked: false };
        playlist.interactedUsers.push(interaction);
        playlist.dislikesCount++;
      }
    } else if (interactedUsers.length === 1) {
      let interaction = interactedUsers[0];
      if (interaction.liked) {
        playlist.likesCount--;
        playlist.interactedUsers = playlist.interactedUsers.filter(
          (interaction) => {
            return interaction.username !== auth.user.username;
          }
        );
        if (!like) {
          playlist.dislikesCount++;
          let interaction = { username: auth.user.username, liked: false };
          playlist.interactedUsers.push(interaction);
        }
      } else {
        playlist.dislikesCount--;
        playlist.interactedUsers = playlist.interactedUsers.filter(
          (interaction) => {
            return interaction.username !== auth.user.username;
          }
        );
        if (like) {
          playlist.likesCount++;
          let interaction = { username: auth.user.username, liked: true };
          playlist.interactedUsers.push(interaction);
        }
      }
    }
    // liked like-> remove dislike->remove and add
    // disliked like -> remove and add dislike -> remove

    const updateList = async (playlist) => {
      let response = await api.updatePlaylistById(
        playlist._id,
        updatedPlaylist
      );
      if (response.data.success) {
        store.loadLists();
      }
    };
    updateList(playlist);
  };

  store.listen = async (playlist) => {
    let updatedPlaylist = playlist;
    updatedPlaylist.listensCount++;
    let response = await api.updatePlaylistById(
      updatedPlaylist._id,
      updatedPlaylist
    );
  };

  store.search = async (searchText) => {
    let response = null;
    let filteredPlaylists = '';
    if (searchText === '') filteredPlaylists = [];
    else {
      if (store.currentScreen === 'HOME')
        response = await api.getPlaylistsByUser();
      else response = await api.getPublishedPlaylists();
      if (store.currentScreen === 'USERS') {
        filteredPlaylists = response.data.playlists.filter((playlist) => {
          return playlist.ownerUsername.includes(searchText);
        });
      } else {
        filteredPlaylists = response.data.playlists.filter((playlist) => {
          return playlist.name.includes(searchText);
        });
      }
    }
    storeReducer({
      type: GlobalStoreActionType.LOAD_PLAYLISTS,
      payload: { playlists: filteredPlaylists, searchText: searchText },
    });
  };

  store.undo = () => {
    tps.undoTransaction();
  };

  store.redo = () => {
    tps.doTransaction();
  };

  store.clearAllTransactions = () => {
    tps.clearAllTransactions();
  };

  store.canUndo = () => {
    return tps.hasTransactionToUndo();
  };

  store.canRedo = () => {
    return tps.hasTransactionToRedo();
  };

  store.addCreateSongTransaction = (index, song) => {
    let transaction = new CreateSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };

  store.addDeleteSongTransaction = () => {
    let index = store.selectedSongIndex;
    let song = store.selectedList.songs[index];
    let transaction = new DeleteSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };

  store.addEditSongTransaction = (newSong) => {
    let index = store.selectedSongIndex;
    let song = store.selectedSong;
    let oldSong = {
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId,
    };
    let transaction = new EditSong_Transaction(store, index, oldSong, newSong);
    tps.addTransaction(transaction);
  };

  store.addMoveSongTransaction = (start, end) => {
    let transaction = new MoveSong_Transaction(store, start, end);
    tps.addTransaction(transaction);
  };

  store.showDeleteSongModal = (index, song) => {
    storeReducer({
      type: GlobalStoreActionType.DELETE_SONG,
      payload: { song: song, index: index },
    });
  };

  store.showEditSongModal = (index, song) => {
    storeReducer({
      type: GlobalStoreActionType.EDIT_SONG,
      payload: { song: song, index: index },
    });
  };

  store.getYouTubeIds = (songs) => {
    let youTubeIds = [];
    for (let i = 0; i < songs.length; i++) {
      youTubeIds.push(songs[i].youTubeId);
    }
    return youTubeIds;
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
};

export default GlobalStoreContext;
export { GlobalStoreContextProvider };

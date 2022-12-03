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
  CREATE_NEW_LIST: 'CREATE_NEW_LIST',
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  DELETE_SONG: 'DELETE_SONG',
  EDIT_SONG: 'EDIT_SONG',
  SET_MODAL: 'SET_MODAL',
};

export const CurrentModal = {
  NONE: 'NONE',
  DELETE_LIST: 'DELETE_LIST',
  EDIT_SONG: 'EDIT_SONG',
  DELETE_SONG: 'DELETE_SONG',
};

const GlobalStoreContextProvider = (props) => {
  const [store, setStore] = useState({
    currentScreen: '',
    currentModal: CurrentModal.NONE,
    visiblePlaylists: [],
    selectedList: null,
    selectedSongIndex: -1,
    selectedSong: null,
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
          visiblePlaylists: payload,
          selectedList: store.selectedList,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      case GlobalStoreActionType.SELECT_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: payload,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: payload,
          selectedList: null,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      case GlobalStoreActionType.SET_CURRENT_SCREEN: {
        return setStore({
          currentScreen: payload,
          currentModal: store.currentModal,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: null,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      case GlobalStoreActionType.DELETE_SONG: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: CurrentModal.DELETE_SONG,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          selectedSongIndex: payload.index,
          selectedSong: payload.song,
        });
      }
      case GlobalStoreActionType.EDIT_SONG: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: CurrentModal.EDIT_SONG,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          selectedSongIndex: payload.index,
          selectedSong: payload.song,
        });
      }
      case GlobalStoreActionType.SET_MODAL: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: payload,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      default:
        return store;
    }
  };

  store.loadUsersLists = async () => {
    const asyncLoadUsersLists = async () => {
      const response = await api.getPlaylistsByUser();
      if (response.data.success) {
        let visiblePlaylists = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.LOAD_PLAYLISTS,
          payload: visiblePlaylists,
        });
      } else {
        console.log('API FAILED TO GET THE USERS LISTS');
      }
    };
    asyncLoadUsersLists();
  };

  store.loadVisibleLists = async () => {
    const asyncLoadVisibleLists = async () => {
      const response = await api.getVisiblePlaylists();
      if (response.data.success) {
        let visiblePlaylists = response.data.visiblePlaylists;
        storeReducer({
          type: GlobalStoreActionType.LOAD_LISTS,
          payload: visiblePlaylists,
        });
      } else {
        console.log('API FAILED TO GET THE LIST PAIRS');
      }
    };
    asyncLoadVisibleLists();
  };

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
    console.log(auth.user);
    let ownerEmail = auth.user.email;
    const response = await api.createPlaylist(
      newListName,
      [],
      ownerUsername,
      ownerEmail
    );
    console.log('createNewList response: ' + response);
    if (response.status === 201) {
      let newList = response.data.playlist;
      store.loadUsersLists();
    } else {
      console.log('API FAILED TO CREATE A NEW LIST');
    }
  };

  store.deleteList = (id) => {
    async function processDelete(id) {
      let response = await api.deletePlaylistById(id);
      store.loadUsersLists();
    }
    processDelete(id);
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
        store.loadUsersLists();
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
        store.loadUsersLists();
      }
    };
    updateList(playlist);
  };

  store.publishList = () => {
    let list = store.selectedList;
    list.isPublished = true;
    list.publishDate = new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

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

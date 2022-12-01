import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsTPS from '../common/jsTPS';
import api from './store-request-api';
import AuthContext from '../auth';
import CreateSong_Transaction from '../transactions/CreateSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';

export const GlobalStoreContext = createContext({});
console.log('create GlobalStoreContext');

const tps = new jsTPS();

export const GlobalStoreActionType = {
  LOAD_PLAYLISTS: 'LOAD_PLAYLISTS',
  SELECT_LIST: 'SELECT_LIST',
  CREATE_NEW_LIST: 'CREATE_NEW_LIST',
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  DELETE_SONG: 'DELETE_SONG',
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
          selectedSongIndex: store.selectedSongIndex,
          selectedSong: store.selectedSong,
        });
      }
      case GlobalStoreActionType.SELECT_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: payload,
          selectedSongIndex: store.selectedSongIndex,
          selectedSong: store.selectedSong,
        });
      }
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: store.currentModal,
          visiblePlaylists: payload,
          selectedList: null,
          selectedSongIndex: store.selectedSongIndex,
          selectedSong: store.selectedSong,
        });
      }
      case GlobalStoreActionType.SET_CURRENT_SCREEN: {
        return setStore({
          currentScreen: payload,
          currentModal: store.currentModal,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: null,
          selectedSongIndex: store.selectedSongIndex,
          selectedSong: store.selectedSong,
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
      case GlobalStoreActionType.SET_MODAL: {
        return setStore({
          currentScreen: store.currentScreen,
          currentModal: payload,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.selectedList,
          selectedSongIndex: store.selectedSongIndex,
          selectedSong: store.selectedSong,
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
    let ownerName = auth.user.firstName + ' ' + auth.user.lastName;
    let ownerEmail = auth.user.email;
    const response = await api.createPlaylist(
      newListName,
      [],
      ownerName,
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
  };

  store.updateSelectedList = () => {
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

  store.selectSong = (index, song) => {
    storeReducer({
      type: GlobalStoreActionType.SELECT_SONG,
      payload: { index: index, song: song },
    });
  };

  store.createSong = (index, song) => {
    let list = store.selectedList;
    list.songs.splice(index, 0, song);
    store.updateSelectedList();
  };

  store.addNewSong = () => {
    let playlistSize = store.selectedList.songs.length;
    store.addCreateSongTransaction(
      playlistSize,
      'Untitled',
      '?',
      'dQw4w9WgXcQ'
    );
    // store.createSong(playlistSize, song);
  };

  store.deleteSong = (index) => {
    let list = store.selectedList;
    list.songs.splice(store.selectedSongIndex, 1);
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

  store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
    let song = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    let transaction = new CreateSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };

  store.addDeleteSongTransaction = (index, song) => {
    let transaction = new DeleteSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };

  store.showDeleteSongModal = (index, song) => {
    storeReducer({
      type: GlobalStoreActionType.DELETE_SONG,
      payload: { song: song, index: index },
    });
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
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import jsTPS from '../common/jsTPS';
import api from './store-request-api';
import AuthContext from '../auth';

export const GlobalStoreContext = createContext({});
console.log('create GlobalStoreContext');

// const tps = new jsTPS();

export const GlobalStoreActionType = {
  LOAD_PLAYLISTS: 'LOAD_PLAYLISTS',
  SELECT_LIST: 'SELECT_LIST',
  CREATE_NEW_LIST: 'CREATE_NEW_LIST',
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  SELECT_SONG: 'SELECT_SONG',
};

const GlobalStoreContextProvider = (props) => {
  const [store, setStore] = useState({
    currentScreen: '',
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
          visiblePlaylists: payload,
          selectedList: null,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      case GlobalStoreActionType.SELECT_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: payload,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentScreen: store.currentScreen,
          visiblePlaylists: payload,
          selectedList: null,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      case GlobalStoreActionType.SET_CURRENT_SCREEN: {
        return setStore({
          currentScreen: payload,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: null,
          selectedSongIndex: -1,
          selectedSong: null,
        });
      }
      case GlobalStoreActionType.SELECT_SONG: {
        return setStore({
          currentScreen: store.currentScreen,
          visiblePlaylists: store.visiblePlaylists,
          selectedList: store.currentScreen,
          selectedSongIndex: payload.index,
          selectedSong: payload.song,
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
        console.log(visiblePlaylists);
        storeReducer({
          type: GlobalStoreActionType.LOAD_VISIBLE_LISTS,
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
          type: GlobalStoreActionType.LOAD_VISIBLE_LISTS,
          payload: visiblePlaylists,
        });
      } else {
        console.log('API FAILED TO GET THE LIST PAIRS');
      }
    };
    asyncLoadVisibleLists();
  };

  store.createNewList = async () => {
    let newListName = 'Untitled';
    const response = await api.createPlaylist(newListName, [], auth.user.email);
    console.log('createNewList response: ' + response);
    if (response.status === 201) {
      let newList = response.data.playlist;
      console.log(newList.name);
    } else {
      console.log('API FAILED TO CREATE A NEW LIST');
    }
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

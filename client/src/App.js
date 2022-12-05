import React from 'react';
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AllListsScreen from './screens/AllListsScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import UsersListScreen from './screens/UsersListScreen';
import DeleteListModal from './components/Modals/DeleteListModal';
import DeleteSongModal from './components/Modals/DeleteSongModal';
import EditSongModal from './components/Modals/EditSongModal';
import ErrorModal from './components/Modals/ErrorModal';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <GlobalStoreContextProvider>
          <Header />
          <Routes>
            <Route path='/' element={<SplashScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/all-lists' element={<AllListsScreen />} />
            <Route path='/users-lists' element={<UsersListScreen />} />
          </Routes>
          <DeleteListModal />
          <DeleteSongModal />
          <EditSongModal />
          <ErrorModal />
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;

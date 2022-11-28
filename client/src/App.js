import React from 'react';
import { AuthContextProvider } from './auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AllListsScreen from './screens/AllListsScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import UsersListScreen from './screens/UsersListScreen';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<SplashScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/all-lists' element={<AllListsScreen />} />
          <Route path='/users-lists' element={<UsersListScreen />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;

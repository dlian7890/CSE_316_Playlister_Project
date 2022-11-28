import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsTPS from '../common/jsTPS';
import api from './store-request-api';

export const GlobalStoreContext = createContext({});
console.log('create GlobalStoreContext');

const tps = new jsTPS();

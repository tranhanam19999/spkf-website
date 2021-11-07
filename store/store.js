import {configureStore} from '@reduxjs/toolkit'
import rootReducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] 
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const initializeStore = () => {
  return configureStore({
    reducer: persistedReducer
  })
}

export const persistor = persistStore(initializeStore())
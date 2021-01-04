import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';

import appReducer from './Reducers/appReducer';

const reducer = combineReducers({
  appReducer,
});

const rootReducer = (state, action) => {
  return reducer(state, action);
};

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const store = createStore(
  persistReducer(rootPersistConfig, rootReducer),
  compose(applyMiddleware(logger)),
);

const persistor = persistStore(store);

export {store, persistor};

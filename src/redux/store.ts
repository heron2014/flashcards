import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import decks, { DecksState } from './decks/reducer';
import rootSaga from './rootSaga';
import { user, UserState } from './user/reducer';
import { shop, ShopState } from './shop/reducer';

const sagaMiddleware = createSagaMiddleware();
const middleware: Middleware[] = [sagaMiddleware];

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export interface RootState {
  decks: DecksState;
  user: UserState;
  shop: ShopState;
}

const rootReducer = combineReducers<RootState>({
  decks,
  user,
  shop,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: __DEV__,
  stateReconciler: autoMergeLevel2,
  version: 0,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
// persistor.purge();

export { store, persistor };

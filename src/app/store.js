import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import persistConfig from '@/persistConfig';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

// const store = createStore(persistConfig(rootReducer), applyMiddleware(thunk));
const store = createStore(persistConfig(rootReducer), enhancer);
const persistor = persistStore(store);
export { store, persistor };

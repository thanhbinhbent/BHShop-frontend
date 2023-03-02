import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import persistConfig from '@/persistConfig';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';

const store = createStore(persistConfig(rootReducer), applyMiddleware(thunk));
const persistor = persistStore(store);
export { store, persistor };

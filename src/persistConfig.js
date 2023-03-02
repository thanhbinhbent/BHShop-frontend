import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};
const persistConfigReducer = (reducers) => persistReducer(persistConfig, reducers);
export default persistConfigReducer;

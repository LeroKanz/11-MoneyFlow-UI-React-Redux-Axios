import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import categoryReducer from './categorySlice';
import accountReducer from './accountSlice';
import lookUpReducer from './lookUpSlice';
import operationReducer from './operationSlice';
import transferReducer from './transferSlice';
import exchangeReducer from './exchangeSlice';
import operationFRReducer from './operationFormRecognizerSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    login: loginReducer,
    forCategories: categoryReducer,
    forAccounts: accountReducer,
    forLookUp: lookUpReducer,
    forOperations: operationReducer,
    forTransfers: transferReducer,
    forExchanges: exchangeReducer,
    forOperationFR: operationFRReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
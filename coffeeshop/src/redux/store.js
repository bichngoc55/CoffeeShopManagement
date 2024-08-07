import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";
import staffReducer from "./staffSlide";
import authReducer from "./authSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  orders: orderReducer,
  carts: cartReducer,
  auths: authReducer,
  staff: staffReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["orders"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { persistor };

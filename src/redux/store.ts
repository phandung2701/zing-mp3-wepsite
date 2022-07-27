import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducers/modalSlide';

import musicReducer from './reducers/musicSlide';

const store = configureStore({
  reducer: {
    music: musicReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

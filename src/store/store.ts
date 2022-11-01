import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import mainReducer from './mainSlice';

export const store = configureStore({
    reducer: {
        main: mainReducer,
        chat: chatReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

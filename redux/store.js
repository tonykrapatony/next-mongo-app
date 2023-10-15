import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import { postsApi } from './postsApi';

export const store = configureStore ({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(usersApi.middleware, postsApi.middleware)
})
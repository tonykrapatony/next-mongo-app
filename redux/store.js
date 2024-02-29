import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import { postsApi } from './postsApi';
import { commentsApi } from './commentsApi';

export const store = configureStore ({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(usersApi.middleware, postsApi.middleware, commentsApi.middleware)
})
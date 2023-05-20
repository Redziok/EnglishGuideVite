import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { filterReducer } from './reducers/filteredPostsReducer';
import { postReducer } from './reducers/postReducer';

export const store = configureStore({
	reducer: {
		user: userReducer.reducer,
		filter: filterReducer.reducer,
		post: postReducer.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.user.userInfo;
export const selectFilter = (state: RootState) => state.filter.filterValue;
export const selectPost = (state: RootState) => state.post;

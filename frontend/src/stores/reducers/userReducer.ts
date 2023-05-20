import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../components/DataTypes';

interface IUserState {
	userInfo: IUser | null;
}

const initialState: IUserState = {
	userInfo: null,
};

export const userReducer = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.userInfo = action.payload;
		},
		clearUser: state => {
			state.userInfo = null;
		},
	},
});

export const { setUser, clearUser } = userReducer.actions;

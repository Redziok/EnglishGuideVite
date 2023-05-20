import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPost, ITranslation } from '../../components/DataTypes';

interface IPostState {
	language: string;
	sectionId: number | null;
	translations: ITranslation[];
	post: IPost | null;
}

const initialState: IPostState = {
	language: '',
	sectionId: null,
	translations: [],
	post: null,
};

export const postReducer = createSlice({
	name: 'post',
	initialState,
	reducers: {
		updateState: (state, action: PayloadAction<Partial<IPostState>>) => {
			Object.assign(state, action.payload);
		},
		clearState: () => initialState,
	},
});

export const { updateState, clearState } = postReducer.actions;

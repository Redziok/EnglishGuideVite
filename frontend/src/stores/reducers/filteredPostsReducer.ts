import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IFilterState {
	filterValue: string;
}

const initialState: IFilterState = {
	filterValue: '',
};

export const filterReducer = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setFilter: (state, action: PayloadAction<string>) => {
			state.filterValue = action.payload;
		},
		clearFilter: state => {
			state.filterValue = '';
		},
	},
});

export const { setFilter, clearFilter } = filterReducer.actions;

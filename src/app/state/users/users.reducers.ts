import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './users.actions';
import { mockUsers } from '../../pages/search/search.mock';

export interface User {
	id: number;
	name: string;
}

export interface State {
	data: User[];
	loading: boolean;
	error: any;
}

export const initialState: State = {
	data: [
		mockUsers[0],
		mockUsers[1],
		mockUsers[2],
		mockUsers[3],
	],
	loading: false,
	error: null
};

export const usersReducer = createReducer(
	initialState,
	on(loadUsers, state => ({ ...state, loading: true })),
	on(loadUsersSuccess, (state, { users }) => ({ ...state, data: users, loading: false })),
	on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false, }))
);

export const selectUserState = createFeatureSelector<State>('users');

export const selectAllUsers = createSelector(
	selectUserState,
	(state: State) => state.data
);

export const selectLoading = createSelector(
	selectUserState,
	(state: State) => state.loading
);

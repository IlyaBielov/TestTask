import { createAction, props } from '@ngrx/store';
import { User } from './users.reducers';

export const loadUsers = createAction('[Users] Load Users', props<{ name: string }>());
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: any }>());

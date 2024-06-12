import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SearchSelectActions from './users.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UsersEffects {
	constructor(
		private actions$: Actions,
		private userService: UserService
	) { }

	loadUsers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SearchSelectActions.loadUsers),
			mergeMap(({ name }) =>
				this.userService.getByName(name).pipe(
					map(users => SearchSelectActions.loadUsersSuccess({ users })),
					catchError(error => of(SearchSelectActions.loadUsersFailure({ error })))
				)
			)
		)
	);
}

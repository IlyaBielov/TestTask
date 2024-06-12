import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { mockUsers } from '../pages/search/search.mock';
import { checkUserName } from '../utils/user-name-check';
import { User } from '../state/users/users.reducers';

const DELAY = 500;

@Injectable()
export class UserService {
  getByName(name: string): Observable<User[]> {
    if (name === '' || null) {
      return of(mockUsers).pipe(delay(DELAY));
    } else {
      return of(mockUsers.filter(user => checkUserName(user, name))).pipe(delay(DELAY));
    }
  }
}

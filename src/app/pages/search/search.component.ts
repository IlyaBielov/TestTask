import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, map, takeUntil, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { mapForSelect } from '../../utils/map-for-select';
import { mockUsers } from './search.mock';
import { selectAllUsers, selectLoading } from '../../state/users/users.reducers';
import { loadUsers } from '../../state/users/users.actions';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSelectComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private store: Store = inject(Store);

  searchSubject: Subject<any> = new Subject<any>();

  searchFromGroup = new FormGroup({
    searchSelectControl: new FormControl({ name: mockUsers[0].name, value: mockUsers[0] }, Validators.required),
  });

  filteredOptions$ = this.store.pipe(select(selectAllUsers)).pipe(map(user => mapForSelect(user, 'name')));
  isLoading$ = this.store.pipe(select(selectLoading));

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(400),
      tap(value => this.store.dispatch(loadUsers({ name: value?.name || '' }))),
      takeUntil(this.unsubscribe$),
    ).subscribe();
  }

  search() {
    const name = (this.searchFromGroup.get('searchSelectControl') as FormControl)?.value?.name;
    this.store.dispatch(loadUsers({ name }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

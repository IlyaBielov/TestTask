import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchSelectComponent } from './search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SelectInputComponent } from '../../components/select-input.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../services/user.service';
import { usersReducer } from '../../state/users/users.reducers';
import { UsersEffects } from '../../state/users/users.effects';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
	{
		path: '',
		component: SearchSelectComponent
	}
];

@NgModule({
	declarations: [
		SearchSelectComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		ReactiveFormsModule,
		StoreModule.forFeature('users', usersReducer),
		EffectsModule.forFeature([UsersEffects]),
		SelectInputComponent,
		RouterModule.forChild(routes)
	],
	exports: [SearchSelectComponent],
	providers: [UserService]
})
export class SearchModule { }

import { Component, forwardRef, OnInit, OnDestroy, Input, ElementRef, HostBinding, Optional, Self, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-select-input',
  styles: [`:host {
    display: block;
    width: 100%;
  }`],
  template: `
    <mat-form-field style="width: 100%">
      <mat-label>{{ placeholder }}</mat-label>
      <input
        #input
        [id]="id"
        matInput
        type="text"
        [placeholder]="placeholder"
        (input)="writeValue(getTargetValue($event))"
        (blur)="blur()"
        (focus)="focus()"
        [value]="value?.name"
        [disabled]="disabled"
        [matAutocomplete]="auto"
      />
      <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn" (optionSelected)="writeValue($event.option.value)">
          @if (isLoading) {
            <mat-option disabled>Loading...</mat-option>
          } @else {
              @if (options?.length === 0) {
                <mat-option disabled>No results found</mat-option>
              } @else {
                @for (option of options; track option) {
                  <mat-option [value]="option">{{ option.name }}</mat-option>
                }
              }
            
          }
        </mat-autocomplete>
    </mat-form-field>
  `,
  standalone: true,
  imports: [MatAutocompleteModule, MatInputModule],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => SelectInputComponent)
    }
  ]
})
export class SelectInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  static nextId = 0;

  @Input() placeholder!: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() options: { name: string, value: any }[] | null = null;
  @Input() skipSelectEvent: boolean = true;
  @Input() isLoading: boolean | null = false;

  @Output() onSearch = new EventEmitter<{ name: string, value: any } | null>();

  value: any;
  focused = false;

  controlType = 'app-select-input';
  id = `app-select-input-${SelectInputComponent.nextId++}`;

  onChange = (_: any) => { };
  onTouched = () => { };

  stateChanges = new Subject<void>();

  errorState!: boolean;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;

  constructor(@Optional() @Self() public ngControl: NgControl, private elementRef: ElementRef) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
      this.value = this.ngControl.value;
    }
  }

  ngOnInit() {
    if (this.ngControl.value && !this.options) {
      this.options = [this.ngControl.value];
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  get empty() {
    return !this.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('class.floating')
  get shouldPlaceholderFloat() {
    return this.shouldLabelFloat;
  }

  displayFn(option: { name: string, value: any }): string {
    return option && option.name ? option.name : '';
  }

  getTargetValue(event: Event) {
    let result = null;

    if (!((event.target as HTMLInputElement).value === '')) {
      result = {
        name: (event.target as HTMLInputElement).value,
        value: this.value?.value || [{ name: '', value: null }]
      }
    }

    this.onSearch.emit(result);

    return result;
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this.elementRef.nativeElement.querySelector('.app-select-input-container');
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent) {
    // Implement your custom logic here when the container is clicked
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.stateChanges.next();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.stateChanges.next();
  }

  setDisabled(disabled: boolean): void {
    this.setDisabledState(disabled);
  }

  setValue(value: any): void {
    this.writeValue(value);
  }

  focus(): void {
    this.focused = true;
    this.stateChanges.next();
  }

  blur(): void {
    this.focused = false;
    this.onTouched();
    this.stateChanges.next();
  }
}

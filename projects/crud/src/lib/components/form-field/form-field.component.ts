import { Component, OnChanges, Input, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Observable, Subject, config } from 'rxjs';
import { Metadata, FieldConfig } from '../../models/metadata';

@Component({
  selector: 'ng-crud-form-field',
  templateUrl: './form-field.component.html',
  exportAs: 'ngcrudui-form-field',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnChanges, OnInit {

  @Input() formGroup: FormGroup;
  @Input() mode: string;
  @Input() forcedSearchParams: any = [];
  @Input() config: FieldConfig;
  @Input() choices = [];
  @Input() reset: Subject<any>;
  type = 'text';
  filteredOptions: Observable<any[]>;
  foreign_model?: Metadata;

  get f() { return this.formGroup.controls; }

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formGroup.get(this.config.name) !== null) {
      this.formGroup.get(this.config.name).valueChanges.subscribe(res => {
        if (this.config.touching) {
          if (res == this.config.touching.field_value) {
            this.formGroup.get(this.config.touching.field).setValue(this.config.touching.change_value);
          }
        }
        if (this.config.type === 'date') {
          const today_time = new Date().getHours();
          if (this.formGroup.get([this.config.name]).value !== null) {
            const date = new Date(this.formGroup.get([this.config.name]).value);
            date.setHours(today_time);
            const date_string = date.toISOString();
            this.formGroup.get([this.config.name]).setValue(
              date_string.slice(0, date_string.indexOf('T')));
          }
        }
      });
    }
  }

  ngOnInit() {
    if (this.config.defaultValue || this.config.defaultValue == 0) {
      this.formGroup.patchValue({
        [this.config.name]: this.config.defaultValue
      });
    }
    if (this.formGroup.get(this.config.name) !== null) {
      if (this.mode === 'edit' || this.mode === 'create') {
        this.formGroup.get(this.config.name).setValidators(this.config.validators);
      } else {
        this.formGroup.get(this.config.name).clearValidators();
      }

      this.formGroup.updateValueAndValidity();

    }
  }
}

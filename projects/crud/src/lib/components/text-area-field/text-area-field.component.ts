import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig, TextAreaControlConfig } from '../../models/metadata';


@Component({
  selector: 'ng-crud-text-area-field',
  exportAs: 'ngcrudui-text-area-field',
  styles: ['.form-field-wrapper{margin-right:  24px}'],
  template: `<mat-form-field [formGroup]="formGroup">
      <mat-label>{{ config.label }}</mat-label>
      <textarea matInput matTextareaAutosize [formControlName]="config.name"
      [rows]="controlConfig?.rowSpan || 1"></textarea>
    </mat-form-field>
  `
})
export class TextAreaField  {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  controlConfig: TextAreaControlConfig;

  constructor() {

  }

  ngOnInit() {
      this.controlConfig = this.config.control as TextAreaControlConfig;
  }


}
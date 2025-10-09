/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-example',
  templateUrl: './date-input-validation.html',
})
export default class DateInputValidation {
  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;
  @ViewChild('nativeFormRef') nativeFormRef!: ElementRef<HTMLFormElement>;

  dateForm: FormGroup;
  nativeDateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      birthDate: ['',],
      startDate: [''], // Optional field
      endDate: ['', [Validators.required]]
    });

    this.nativeDateForm = this.fb.group({
      nativeBirthDate: ['', [Validators.required]],
      nativeStartDate: [''], // Optional field
      nativeEndDate: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.dateForm.valid) {
      console.log('=== FORM SUBMISSION ===');
      console.log('Form Values:', this.dateForm.value);
      alert('Form submitted successfully!\nCheck console for details.');
    } else {
      console.log('=== FORM VALIDATION FAILED ===');
      console.log('Form Errors:', this.getFormErrors());
      this.markAllFieldsAsTouched();
    }
  }

  onReset(): void {
    console.log('=== FORM RESET ===');
    this.dateForm.reset();

    // Also trigger browser's native form reset for custom elements
    if (this.formRef?.nativeElement) {
      this.formRef.nativeElement.reset();
    }

    console.log('Form has been reset');
  }

  onClear(): void {
    console.log('=== CLEAR ALL FIELDS ===');
    this.dateForm.patchValue({
      birthDate: '',
      startDate: '',
      endDate: ''
    });
    console.log('All fields cleared');
  }

  onClearSpecific(fieldName: string): void {
    console.log(`=== CLEAR ${fieldName.toUpperCase()} ===`);
    this.dateForm.patchValue({
      [fieldName]: ''
    });
    console.log(`${fieldName} field cleared`);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.dateForm.get(fieldName);
    if (control?.errors && (control.dirty || control.touched)) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      // Add more validation messages as needed
      return 'Invalid value';
    }
    return '';
  }

  getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'birthDate': 'Birth Date',
      'startDate': 'Start Date',
      'endDate': 'End Date'
    };
    return displayNames[fieldName] || fieldName;
  }

  getFormValues(): string {
    return JSON.stringify(this.dateForm.value, null, 2);
  }

  getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.dateForm.controls).forEach(key => {
      const control = this.dateForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.dateForm.controls).forEach(key => {
      const control = this.dateForm.get(key);
      control?.markAsTouched();
    });
  }

  // Native form methods
  onNativeSubmit(): void {
    if (this.nativeDateForm.valid) {
      console.log('=== NATIVE FORM SUBMISSION ===');
      console.log('Native Form Values:', this.nativeDateForm.value);
      alert('Native form submitted successfully!\nCheck console for details.');
    } else {
      console.log('=== NATIVE FORM VALIDATION FAILED ===');
      console.log('Native Form Errors:', this.getNativeFormErrors());
      this.markAllNativeFieldsAsTouched();
    }
  }

  onNativeReset(): void {
    console.log('=== NATIVE FORM RESET ===');
    this.nativeDateForm.reset();

    // Also trigger browser's native form reset
    if (this.nativeFormRef?.nativeElement) {
      this.nativeFormRef.nativeElement.reset();
    }

    console.log('Native form has been reset');
  }

  onNativeClear(): void {
    console.log('=== CLEAR ALL NATIVE FIELDS ===');
    this.nativeDateForm.patchValue({
      nativeBirthDate: '',
      nativeStartDate: '',
      nativeEndDate: ''
    });
    console.log('All native fields cleared');
  }

  getNativeFormValues(): string {
    return JSON.stringify(this.nativeDateForm.value, null, 2);
  }

  getNativeFormErrors(): any {
    const errors: any = {};
    Object.keys(this.nativeDateForm.controls).forEach(key => {
      const control = this.nativeDateForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  private markAllNativeFieldsAsTouched(): void {
    Object.keys(this.nativeDateForm.controls).forEach(key => {
      const control = this.nativeDateForm.get(key);
      control?.markAsTouched();
    });
  }
}

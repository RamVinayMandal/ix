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
  selector: 'app-example',
  templateUrl: './date-input.html',
})
export default class DateInput {
  @ViewChild('nativeFormRef') nativeFormRef!: ElementRef<HTMLFormElement>;

  nativeDateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.nativeDateForm = this.fb.group({
      nativeBirthDate: ['', [Validators.required]],
      nativeStartDate: [''], // Optional field
      nativeEndDate: ['', [Validators.required]]
    });
  }

  onSubmitWithValidation(event: Event) {
    event.preventDefault();
    console.log('=== FORM 1: HTML5 Validation Enabled ===');
    console.log('Form submitted with HTML5 validation enabled');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log('Form data:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Check if form is valid using HTML5 validation
    if (form.checkValidity()) {
      console.log('✅ Form is valid according to HTML5 validation');
    } else {
      console.log('❌ Form is invalid according to HTML5 validation');
    }
    console.log('==========================================');
  }

  onSubmitDefault(event: Event) {
    event.preventDefault();
    console.log('=== FORM 2: Angular Default (No HTML5 Validation) ===');
    console.log('Form submitted with Angular default behavior (novalidate)');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log('Form data:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    console.log('Note: HTML5 validation is disabled by Angular default');
    console.log('====================================================');
  }

  onSubmitExplicitNoValidate(event: Event) {
    event.preventDefault();
    console.log('=== FORM 3: Explicit NoValidate ===');
    console.log('Form submitted with explicit novalidate attribute');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log('Form data:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    console.log('Note: HTML5 validation is explicitly disabled');
    console.log('=====================================');
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

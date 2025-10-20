/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-input-novalidate-test',
  templateUrl: './time-input-novalidate-test.html',
  styleUrls: [],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class TimeInputNovalidateTest {
  timeValue1 = ''; // Empty to test required validation
  timeValue2 = ''; // Empty optional field
  timeValue3 = ''; // Empty to test internal validation
  formMessage = '';

  handleSubmitWithValidation(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    console.log('=== FORM 1: HTML5 Validation Enabled ===');
    console.log('Form submitted with HTML5 validation enabled');

    // Get form data
    const formData = new FormData(form);
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log('Form data:');
    Object.entries(data).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // HTML5 validation check
    if (form.checkValidity()) {
      console.log('✅ Form is valid according to HTML5 validation');
      this.formMessage = '✅ Form submitted successfully! HTML5 validation passed.';
    } else {
      console.log('❌ Form is invalid according to HTML5 validation');
      this.formMessage = '❌ Form validation failed. Please check the fields.';
      // Trigger HTML5 validation display
      form.reportValidity();
    }
    console.log('==========================================');
  }

  handleSubmitWithoutValidation(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    console.log('=== FORM 2: Internal Validation (noValidate) ===');
    console.log('Form submitted with noValidate (HTML5 validation bypassed)');

    // Get form data
    const formData = new FormData(form);
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log('Form data:');
    Object.entries(data).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // Manual validation check could be added here
    console.log('✅ Form submitted with internal validation handling');
    this.formMessage = '✅ Form submitted with internal validation! Check the logs.';
    console.log('==========================================');
  }

  onTimeValue1Change(event: any) {
    this.timeValue1 = event.detail;
  }

  onTimeValue2Change(event: any) {
    this.timeValue2 = event.detail;
  }

  onTimeValue3Change(event: any) {
    this.timeValue3 = event.detail;
  }

  handleNativeFormSubmit(event: Event) {
    event.preventDefault();
    console.log('Native form submitted');
  }

  onReset(): void {
    console.log('=== TIME FORM RESET ===');
    this.timeValue1 = '';
    this.timeValue2 = '';
    this.timeValue3 = '';
    this.formMessage = '';
    console.log('Time form has been reset');
  }

  onClear(): void {
    console.log('=== CLEAR ALL TIME FIELDS ===');
    this.timeValue1 = '';
    this.timeValue2 = '';
    this.timeValue3 = '';
    this.formMessage = '';
    console.log('All time fields cleared');
  }
}

/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import {
  IxCheckboxGroup,
  IxCheckbox,
  IxBooleanValueAccessorDirective,
} from '@siemens/ix-angular/standalone';

@Component({
  standalone: true,
  selector: 'app-example',
  imports: [IxCheckboxGroup, IxCheckbox, IxBooleanValueAccessorDirective],
  templateUrl: `./form-checkbox-group.html`,
})
export default class FormCheckboxGroup {
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
}

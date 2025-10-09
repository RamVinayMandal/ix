/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-example',
  templateUrl: `./form-checkbox-group.html`,
})
export default class FormCheckboxGroup {
  checkboxForm: FormGroup;

  // Native form data
  nativeFormData = {
    agreed: false,
    most: false,
  };

  constructor(private fb: FormBuilder) {
    this.checkboxForm = this.fb.group({
      agreed: [false],
      most: [false],
    });
  }

  onCheckboxSubmit(event?: Event) {
    console.log('=== IX CHECKBOX FORM SUBMISSION ATTEMPT ===');

    // First check if browser validation passed
    if (event && event.target) {
      const form = event.target as HTMLFormElement;
      const isValid = form.checkValidity();

      console.log('Browser validation result:', isValid);

      if (!isValid) {
        console.log('Browser validation failed - preventing submission');
        form.reportValidity(); // Show browser validation messages
        return;
      }
    }

    console.log('IX Checkbox Form Submitted:', this.checkboxForm.value);
    console.log('Form Valid:', this.checkboxForm.valid);
  }

  // IX Browser validation test (without Angular reactive forms)
  onIXBrowserSubmit(event: Event) {
    console.log('=== IX BROWSER FORM SUBMISSION ===');

    const form = event.target as HTMLFormElement;
    const isValid = form.checkValidity();

    console.log('IX Browser validation result:', isValid);

    if (!isValid) {
      console.log('IX Browser validation failed - should show popup');
      form.reportValidity(); // This should show browser validation popup
      event.preventDefault();
      return;
    }

    // Get form data
    const formData = new FormData(form);
    const agreed = formData.has('agreed');
    const most = formData.has('most');

    console.log('IX Form would be submitted:', { agreed, most });
    event.preventDefault(); // Prevent actual submission for demo
  }

  // Native form methods
  onNativeSubmit(form: NgForm) {
    console.log('=== NATIVE FORM SUBMISSION ===');
    console.log('Form Values:', this.nativeFormData);
    console.log('Form Valid:', form.valid);
    console.log('Form Submitted:', form.submitted);
    console.log('At least one selected:', this.nativeFormData.agreed || this.nativeFormData.most);

    // Prevent submission if no checkboxes are selected
    if (!this.nativeFormData.agreed && !this.nativeFormData.most) {
      console.log('Submission blocked - no checkboxes selected');
    } else {
      console.log('Native form would be submitted');
    }
  }

  resetNativeForm(form: NgForm) {
    console.log('=== NATIVE FORM RESET ===');
    this.nativeFormData = {
      agreed: false,
      most: false,
    };
    form.resetForm();
    console.log('Native form reset completed');
  }

  // Browser validation methods
  onBrowserSubmit(event: Event, form: HTMLFormElement) {
    console.log('=== BROWSER FORM SUBMISSION ===');

    const formData = new FormData(form);
    const agreed = formData.has('agreed');
    const most = formData.has('most');

    console.log('Form Values:', { agreed, most });
    console.log('At least one selected:', agreed || most);

    // Custom validation for "at least one required"
    if (!agreed && !most) {
      event.preventDefault();
      console.log('Submission blocked - no checkboxes selected');

      // Set custom validation message
      const agreedInput = form.querySelector('#browser-agreed') as HTMLInputElement;
      const mostInput = form.querySelector('#browser-most') as HTMLInputElement;

      if (agreedInput && mostInput) {
        agreedInput.setCustomValidity('Please select at least one option');
        mostInput.setCustomValidity('Please select at least one option');

        // Show validation messages
        form.reportValidity();
      }
    } else {
      // Clear custom validation messages
      const agreedInput = form.querySelector('#browser-agreed') as HTMLInputElement;
      const mostInput = form.querySelector('#browser-most') as HTMLInputElement;

      if (agreedInput && mostInput) {
        agreedInput.setCustomValidity('');
        mostInput.setCustomValidity('');
      }

      event.preventDefault(); // Prevent actual submission for demo
      console.log('Browser form would be submitted');
    }
  }

  resetBrowserForm(agreedInput: HTMLInputElement, mostInput: HTMLInputElement) {
    console.log('=== BROWSER FORM RESET ===');

    agreedInput.checked = false;
    mostInput.checked = false;

    // Clear any custom validation messages
    agreedInput.setCustomValidity('');
    mostInput.setCustomValidity('');

    console.log('Browser form reset completed');
  }

  validateBrowserForm(agreedInput: HTMLInputElement, mostInput: HTMLInputElement, form: HTMLFormElement) {
    console.log('=== FORCE BROWSER VALIDATION ===');

    const agreed = agreedInput.checked;
    const most = mostInput.checked;

    console.log('Current state:', { agreed, most });

    if (!agreed && !most) {
      // Set custom validation messages
      agreedInput.setCustomValidity('Please select at least one option');
      mostInput.setCustomValidity('Please select at least one option');
      console.log('Setting custom validation messages');
    } else {
      // Clear validation messages
      agreedInput.setCustomValidity('');
      mostInput.setCustomValidity('');
      console.log('Clearing validation messages');
    }

    // Trigger browser validation display
    const isValid = form.reportValidity();
    console.log('Form validity:', isValid);
  }
}

/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './radio-group.html',
})
export default class RadioGroup implements OnInit {
  radioForm!: FormGroup;
  // Add a native radio group example for comparison
  nativeForm!: FormGroup;

  ngOnInit() {
    this.radioForm = new FormGroup({
      selectedStorage: new FormControl('256'),
      // customerName: new FormControl('', Validators.required),
      // email: new FormControl(''),
    });
    // Native radio group form
    this.nativeForm = new FormGroup({
      nativeStorage: new FormControl('256', Validators.required),
    });
  }

  onSubmit() {
    const form = this.radioForm;
    // console.log('=== RADIO GROUP FORM SUBMISSION ===');
    // console.log('Form submitted with values:');
    // console.log('Selected Storage:', form.value.selectedStorage);
    // console.log('Customer Name:', form.value.customerName);
    // console.log('Email:', form.value.email);
    // console.log('Form Valid:', form.valid);
    // console.log('Form Touched:', form.touched);

    // if (form.valid) {
    //   console.log('✅ Form is valid - Order can be processed');
    //   alert(`Order submitted!\nStorage: ${form.value.selectedStorage}GB\nCustomer: ${form.value.customerName}\nEmail: ${form.value.email}`);
    // } else {
    //   console.log('❌ Form is invalid - Please check required fields');
    //   alert('Please fill in all required fields before submitting.');
    // }
    console.log('====================================');
  }

  resetForm() {

    console.log('=== FORM RESET ===');
    

    this.radioForm.reset();

    
  }

  clearTouchedState() {
    const form = this.radioForm;
    console.log('=== CLEAR TOUCHED STATE ===');
    Object.values(form.controls).forEach(control => control.markAsUntouched());
    console.log('All controls marked as untouched.');
    console.log('Values preserved:', form.value);
    console.log('============================');
  }

  nativeFormSubmit() {
    const form = this.nativeForm;
    console.log('=== NATIVE RADIO GROUP FORM SUBMISSION ===');
    console.log('Form submitted with values:');
    console.log('Selected Storage:', form.value.nativeStorage);
    console.log('Form Valid:', form.valid);
    console.log('Form Touched:', form.touched);

    // if (form.valid) {
    //   console.log('✅ Form is valid - Order can be processed');
    //   alert(`Order submitted!\nStorage: ${form.value.nativeStorage}GB`);
    // } else {
    //   console.log('❌ Form is invalid - Please check required fields');
    //   alert('Please select a storage option before submitting.');
    // }
    // console.log('==========================================');
  }
}

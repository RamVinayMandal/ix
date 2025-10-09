/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-example',
  templateUrl: './time-input.html',
})
export default class TimeInput {
  touched = false;
  value = '';
  valid = false;
  invalid = false;
  inputInvalid = false;

  onValueChange(event: any) {
    const val = event.detail ?? '';
    this.value = val;
    // Simple validation: valid if not empty and not 'invalid'
    this.valid = !!this.value && this.value !== 'invalid';
    this.invalid = !this.valid;
    this.inputInvalid = this.invalid;
    // Touched logic: if value changes by user, mark as touched
    this.touched = true;
  }

  /**
   * Simulates a user clearing the field (field is empty, touched, and invalid)
   */
  setEmptyProgrammatically(timeInput: any) {
    if (timeInput) {
      timeInput.value = '';
      this.touched = true;
      this.value = '';
      // Empty and touched is invalid
      this.valid = false;
      this.invalid = true;
      this.inputInvalid = true;
    }
  }

  /**
   * Simulates a true form reset (field is empty, untouched, and valid)
   */
  resetValue(timeInput: any) {
    if (timeInput) {
      timeInput.value = null;
      this.touched = false;
      this.value = '';
      // Empty and untouched is valid (no error shown)
      this.valid = true;
      this.invalid = false;
      this.inputInvalid = false;
    }
  }
}

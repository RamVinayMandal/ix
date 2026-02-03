/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-example',
  templateUrl: './date-input-form-test.html',
})
export default class DateInputFormTest {
  @ViewChild('requiredRef') requiredRef: any;
  @ViewChild('optionalRef') optionalRef: any;
  @ViewChild('formRequiredRef') formRequiredRef: any;
  @ViewChild('formOptionalRef') formOptionalRef: any;
  @ViewChild('noValidateRequiredRef') noValidateRequiredRef: any;
  @ViewChild('noValidateOptionalRef') noValidateOptionalRef: any;

  logs: Array<{ id: string; message: string }> = [];
  logIdCounter = 0;

  // State for different scenarios
  requiredValue = '';
  optionalValue = '';
  formRequiredValue = '';
  formOptionalValue = '';
  noValidateRequiredValue = '';
  noValidateOptionalValue = '';

  addLog(message: string): void {
    this.logIdCounter += 1;
    const uniqueId = `${Date.now()}-${this.logIdCounter}`;
    this.logs.push({ id: uniqueId, message: `[${new Date().toLocaleTimeString()}] ${message}` });
  }

  async debugValidationState(inputRef: any, label: string): Promise<void> {
    const element = inputRef?.nativeElement || inputRef;
    if (!element) {
      this.addLog(`${label} - Element not available`);
      return;
    }

    const classList = Array.from(element.classList);
    const hasRequiredClass = classList.includes('ix-invalid--required');
    const required = element.required;
    const value = element.value;

    let touched = 'unknown';
    try {
      if (typeof element.isTouched === 'function') {
        touched = String(await element.isTouched());
      }
    } catch {
      touched = 'error';
    }

    this.addLog(`${label} - Req:${required}, Val:"${value}", Touch:${touched}, RedClass:${hasRequiredClass}`);
  }

  async triggerNativeBlur(elementRef: any): Promise<void> {
    const element = elementRef?.nativeElement || elementRef;
    if (!element) return;
    try {
      const nativeInput = await element.getNativeInputElement();
      if (nativeInput) {
        nativeInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
        this.addLog('✅ Native blur triggered');
      }
    } catch (error) {
      this.addLog(`❌ Error: ${error}`);
    }
  }

  clearLogs(): void {
    this.logs = [];
  }

  setValue(ref: any, value: string, label: string): void {
    const element = ref?.nativeElement || ref;
    if (element) {
      element.value = value;
      this.updateValue(label, value);
    }
  }

  updateValue(label: string, value: string): void {
    switch (label) {
      case '1️⃣': this.requiredValue = value; break;
      case '2️⃣': this.optionalValue = value; break;
      case '3️⃣': this.formRequiredValue = value; break;
      case '4️⃣': this.formOptionalValue = value; break;
      case '5️⃣': this.noValidateRequiredValue = value; break;
      case '6️⃣': this.noValidateOptionalValue = value; break;
    }
  }

  async clearInput(ref: any, label: string): Promise<void> {
    const element = ref?.nativeElement || ref;
    if (element && typeof element.clear === 'function') {
      await element.clear();
      this.setValue(ref, '', label);
      this.addLog(`${label} Cleared`);
    }
  }

  onValueChange(event: CustomEvent, label: string): void {
    this.addLog(`${label} Value: "${event.detail ?? 'empty'}"`);
    this.updateValue(label, event.detail ?? '');
  }

  onFocus(label: string, ref: any): void {
    this.addLog(`${label} Focus`);
    setTimeout(() => this.debugValidationState(ref, `${label} FOCUS`), 10);
  }

  onBlur(label: string, ref: any): void {
    this.addLog(`${label} Blur`);
    setTimeout(() => this.debugValidationState(ref, `${label} BLUR`), 100);
  }

  onSubmit(label: string): void {
    this.addLog(`${label} Form submitted`);
  }
}

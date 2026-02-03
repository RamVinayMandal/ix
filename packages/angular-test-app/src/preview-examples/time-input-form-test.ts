/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-example',
  templateUrl: './time-input-form-test.html',
})
export default class TimeInputFormTest {
  @ViewChild('requiredRef') requiredRef: any;
  @ViewChild('optionalRef') optionalRef: any;
  @ViewChild('formRequiredRef') formRequiredRef: any;
  @ViewChild('formOptionalRef') formOptionalRef: any;
  @ViewChild('noValidateRequiredRef') noValidateRequiredRef: any;
  @ViewChild('noValidateOptionalRef') noValidateOptionalRef: any;

  logs: string[] = [];

  // State for different scenarios
  requiredValue = '';
  optionalValue = '';
  formRequiredValue = '';
  formOptionalValue = '';
  noValidateRequiredValue = '';
  noValidateOptionalValue = '';

  testForm: FormGroup;
  noValidateForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.testForm = this.fb.group({
      formRequiredTime: ['', Validators.required],
      formOptionalTime: ['']
    });

    this.noValidateForm = this.fb.group({
      noValidateRequiredTime: ['', Validators.required],
      noValidateOptionalTime: ['']
    });
  }

  addLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${message}`);
  }

  clearLogs(): void {
    this.logs = [];
  }

  async debugValidationState(ref: any, label: string): Promise<void> {
    const element = ref?.nativeElement || ref;
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

  async triggerNativeBlur(ref: any): Promise<void> {
    const element = ref?.nativeElement || ref;
    if (!element) return;

    try {
      if (typeof element.getNativeInputElement === 'function') {
        const nativeInput = await element.getNativeInputElement();
        if (nativeInput) {
          nativeInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
          this.addLog('✅ Native blur triggered');
        }
      }
    } catch (error) {
      this.addLog(`❌ Error: ${error}`);
    }
  }

  async manualBlurAndDebug(ref: any, label: string): Promise<void> {
    await this.triggerNativeBlur(ref);
    setTimeout(() => this.debugValidationState(ref, label), 100);
  }

  async clearAndLog(ref: any, valueSetter: () => void, label: string): Promise<void> {
    await this.clearInput(ref);
    valueSetter();
    this.addLog(label);
  }

  assignEmpty(propertyName: string): void {
    (this as any)[propertyName] = '';
  }

  setValue(ref: any, value: string): void {
    const element = ref?.nativeElement || ref;
    if (element) {
      element.value = value;
    }
  }

  async clearInput(ref: any): Promise<void> {
    const element = ref?.nativeElement || ref;
    if (element && typeof element.clear === 'function') {
      await element.clear();
    }
  }

  onValueChange(event: CustomEvent, emoji: string, propertyName: string): void {
    const value = event.detail ?? '';
    (this as any)[propertyName] = value;
    this.addLog(`${emoji} Value: "${value || 'empty'}"`);
  }

  onFocus(emoji: string, ref: any, label: string): void {
    this.addLog(`${emoji} Focus`);
    setTimeout(() => this.debugValidationState(ref, `${emoji} FOCUS`), 10);
  }

  onBlur(emoji: string, ref: any, label: string): void {
    this.addLog(`${emoji} Blur`);
    setTimeout(() => this.debugValidationState(ref, `${emoji} BLUR`), 100);
  }

  onSubmit(emoji: string, formName: string): void {
    this.addLog(`${emoji} ${formName} submitted`);
  }

  getLogColor(log: string): string {
    if (log.includes('❌')) return '#d32f2f';
    if (log.includes('BLUR') || log.includes('FOCUS') || log.includes('MANUAL')) return '#1976d2';
    return 'inherit';
  }
}

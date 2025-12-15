/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';

interface LogEntry {
  id: string;
  message: string;
}

@Component({
  standalone: false,
  selector: 'app-example',
  templateUrl: './time-input-form-test.html',
})
export default class TimeInputFormTest {
  logs: LogEntry[] = [];
  logIdCounter = 0;

  // State for different scenarios
  requiredValue = '';
  optionalValue = '';
  formRequiredValue = '';
  formOptionalValue = '';
  noValidateRequiredValue = '';
  noValidateOptionalValue = '';

  addLog(message: string) {
    this.logIdCounter += 1;
    const uniqueId = `${Date.now()}-${this.logIdCounter}`;
    this.logs.push({
      id: uniqueId,
      message: `[${new Date().toLocaleTimeString()}] ${message}`,
    });
  }

  async debugValidationState(element: any, label: string) {
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

    this.addLog(
      `${label} - Req:${required}, Val:"${value}", Touch:${touched}, RedClass:${hasRequiredClass}`
    );
  }

  async triggerNativeBlur(element: any) {
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

  clearLogs() {
    this.logs = [];
  }

  onValueChange(scenario: string, value: string | undefined) {
    this.addLog(`${scenario} Value: "${value ?? 'empty'}"`);
  }

  onFocus(scenario: string, element: any) {
    this.addLog(`${scenario} Focus`);
    setTimeout(() => this.debugValidationState(element, `${scenario} FOCUS`), 10);
  }

  onBlur(scenario: string, element: any) {
    this.addLog(`${scenario} Blur`);
    setTimeout(() => this.debugValidationState(element, `${scenario} BLUR`), 100);
  }

  async onManualBlur(scenario: string, element: any) {
    await this.triggerNativeBlur(element);
    setTimeout(() => this.debugValidationState(element, `${scenario} MANUAL`), 100);
  }

  async clearInput(scenario: string, element: any) {
    if (element && typeof element.clear === 'function') {
      await element.clear();
      this.addLog(`${scenario} Cleared`);
      // Small delay to ensure component state is fully updated
      setTimeout(() => {
        // Sync the bound value with the cleared element
        const clearedValue = element.value || '';
        switch (scenario) {
          case '1️⃣':
            this.requiredValue = clearedValue;
            break;
          case '2️⃣':
            this.optionalValue = clearedValue;
            break;
          case '3️⃣':
            this.formRequiredValue = clearedValue;
            break;
          case '4️⃣':
            this.formOptionalValue = clearedValue;
            break;
          case '5️⃣':
            this.noValidateRequiredValue = clearedValue;
            break;
          case '6️⃣':
            this.noValidateOptionalValue = clearedValue;
            break;
        }
      }, 0);
    }
  }  onFormSubmit(scenario: string, event: Event) {
    event.preventDefault();
    this.addLog(`${scenario} Form submitted`);
  }

  setValue(scenario: string, element: any, value: string) {
    if (element) {
      element.value = value;
      // Also update the bound variable
      switch (scenario) {
        case '1️⃣':
          this.requiredValue = value;
          break;
        case '2️⃣':
          this.optionalValue = value;
          break;
        case '3️⃣':
          this.formRequiredValue = value;
          break;
        case '4️⃣':
          this.formOptionalValue = value;
          break;
        case '5️⃣':
          this.noValidateRequiredValue = value;
          break;
        case '6️⃣':
          this.noValidateOptionalValue = value;
          break;
      }
    }
  }

  getLogColor(message: string): string {
    if (message.includes('❌')) {
      return '#d32f2f';
    } else if (message.includes('BLUR') || message.includes('FOCUS') || message.includes('MANUAL')) {
      return '#1976d2';
    }
    return 'inherit';
  }
}

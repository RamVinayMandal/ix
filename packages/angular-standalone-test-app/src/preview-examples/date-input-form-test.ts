/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxDateInput } from '@siemens/ix-angular/standalone';

type ScenarioKey = 's1' | 's2' | 's3' | 's4' | 's5' | 's6';

interface LogEntry {
  id: string;
  message: string;
}

@Component({
  selector: 'app-example',
  imports: [IxDateInput, CommonModule],
  templateUrl: './date-input-form-test.html',
})
export default class DateInputFormTest {
  @ViewChild('requiredRef') requiredRef: any;
  @ViewChild('optionalRef') optionalRef: any;
  @ViewChild('formRequiredRef') formRequiredRef: any;
  @ViewChild('formOptionalRef') formOptionalRef: any;
  @ViewChild('noValidateRequiredRef') noValidateRequiredRef: any;
  @ViewChild('noValidateOptionalRef') noValidateOptionalRef: any;
  @ViewChild('initialInvalidRef') initialInvalidRef: any;

  logs: LogEntry[] = [];
  values: Record<ScenarioKey, string> = {
    s1: '',
    s2: '',
    s3: '',
    s4: '',
    s5: '',
    s6: '',
  };

  private logCounter = 0;

  sectionStyle(color: string) {
    return { border: `1px solid ${color}`, padding: '1rem', borderRadius: '4px' };
  }

  sectionStyleWithMargin(color: string) {
    return { ...this.sectionStyle(color), marginBottom: '1rem' };
  }

  buttonStyle(backgroundColor: string) {
    return {
      padding: '0.35rem 0.7rem',
      fontSize: '0.8rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor,
      color: 'white',
    };
  }

  buttonStyleWithMargin(backgroundColor: string) {
    return { ...this.buttonStyle(backgroundColor), marginBottom: '1rem' };
  }

  logColor(message: string) {
    if (message.includes('❌')) {
      return '#c62828';
    }

    if (message.includes('✅')) {
      return '#2e7d32';
    }

    return 'inherit';
  }

  log(message: string): void {
    this.logCounter += 1;
    this.logs.push({
      id: `${Date.now()}-${this.logCounter}`,
      message: `[${new Date().toLocaleTimeString()}] ${message}`,
    });
  }

  clearLogs(): void {
    this.logs = [];
  }

  onValueChange(key: ScenarioKey, event: CustomEvent<string | undefined>): void {
    this.values[key] = event.detail ?? '';
  }

  setScenarioValue(key: ScenarioKey, value: string, label: string, action: string): void {
    this.values[key] = value;
    this.log(`${label} -> ${action}`);
  }

  async inspect(key: ScenarioKey, label: string): Promise<void> {
    const element = this.getScenarioElement(key);
    if (!element) {
      return;
    }

    const hostClasses = Array.from<string>(element.classList).filter((className: string) =>
      className.startsWith('ix-invalid')
    );
    const nativeInput = await element.getNativeInputElement();
    const inputClasses = Array.from<string>(nativeInput.classList).filter((className: string) =>
      className.startsWith('is-invalid')
    );

    let touched: string | boolean | undefined = undefined;
    try {
      touched = await element.isTouched?.();
    } catch {
      touched = 'error';
    }

    this.log(
      `${label} | value="${element.value}" required=${element.required} touched=${touched} ` +
        `host=[${hostClasses.join(',')}] input=[${inputClasses.join(',')}]`
    );
  }

  async manualBlur(key: ScenarioKey, label: string): Promise<void> {
    const element = this.getScenarioElement(key);
    if (!element) {
      return;
    }

    const nativeInput = await element.getNativeInputElement();
    nativeInput.focus();
    await this.delay(30);
    nativeInput.blur();
    await this.delay(50);
    await this.inspect(key, `${label} after blur`);
  }

  async clearField(key: ScenarioKey, label: string): Promise<void> {
    const element = this.getScenarioElement(key);
    if (!element) {
      return;
    }

    await element.clear();
    this.values[key] = '';
    this.log(`${label} clear() called`);
    await this.inspect(key, `${label} after clear`);
  }

  async callReportValidity(key: ScenarioKey, label: string): Promise<void> {
    const element = this.getScenarioElement(key);
    if (!element) {
      return;
    }

    const valid = await element.reportValidity();
    this.log(`${label} reportValidity() -> ${valid ? '✅ valid' : '❌ invalid'}`);
    await this.inspect(key, `${label} after reportValidity`);
  }

  submitStandardForm(event: Event, label: string): void {
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) {
      this.log(`${label} form submit blocked — invalid fields`);
      return;
    }

    this.log(`${label} form submitted ✅`);
  }

  submitNoValidateForm(label: string): void {
    this.log(`${label} novalidate form submitted ✅ (submit bypassed validation due to noValidate)`);
  }

  async inspectInitialInvalid(): Promise<void> {
    const element = this.initialInvalidRef;
    const resolved = element?.nativeElement || element;
    if (!resolved) {
      return;
    }

    const nativeInput = await resolved.getNativeInputElement();
    this.log(`7 after blur | input classes: [${Array.from(nativeInput.classList).join(', ')}]`);
  }

  private getScenarioElement(key: ScenarioKey): any {
    const refMap: Record<ScenarioKey, any> = {
      s1: this.requiredRef,
      s2: this.optionalRef,
      s3: this.formRequiredRef,
      s4: this.formOptionalRef,
      s5: this.noValidateRequiredRef,
      s6: this.noValidateOptionalRef,
    };

    const candidate = refMap[key];
    return candidate?.nativeElement || candidate;
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}

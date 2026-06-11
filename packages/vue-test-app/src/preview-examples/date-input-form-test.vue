<!--
SPDX-FileCopyrightText: 2024 Siemens AG

SPDX-License-Identifier: MIT

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
-->

<template>
  <div style="padding: 1rem; font-size: 0.875rem; max-width: 1100px">
    <h2 style="margin-bottom: 0.25rem">
      Date Input — Validation Scenarios (WCAG 3.3.1)
    </h2>
    <p style="margin: 0 0 0.5rem 0; color: #555">
      Format: <code>yyyy/MM/dd</code> | Valid example: <code>2024/12/25</code> |
      Invalid example: <code>bad-date</code>
    </p>
    <p
      style="
        margin: 0 0 1rem 0;
        padding: 0.5rem 0.75rem;
        border-radius: 4px;
        font-size: 0.8rem;
      "
    >
      <strong>Expected:</strong> No red on initial load or programmatic set. Red
      appears only after blur, form submit, or <code>reportValidity()</code>.
    </p>

    <button
      :style="{ ...buttonStyle('#455a64'), marginBottom: '1rem' }"
      @click="logs = []"
    >
      Clear Log
    </button>

    <div
      style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
      "
    >
      <div :style="sectionStyle('#f44336')">
        <strong>1. Required — Standalone (AJAX save)</strong>
        <div>
          <ix-date-input
            ref="requiredRef"
            label="Required Date"
            required
            :value="values.s1"
            @valueChange="onValueChange('s1', $event)"
            @blur="inspect('s1', '1')"
          />
        </div>
        <div
          style="
            display: flex;
            gap: 0.4rem;
            margin-top: 0.5rem;
            flex-wrap: wrap;
          "
        >
          <button
            type="button"
            :style="buttonStyle('#607d8b')"
            @click="setScenarioValue('s1', '', '1', 'Empty')"
          >
            Empty
          </button>
          <button
            type="button"
            :style="buttonStyle('#4caf50')"
            @click="setScenarioValue('s1', '2024/12/25', '1', 'Valid')"
          >
            Valid
          </button>
          <button
            type="button"
            :style="buttonStyle('#f44336')"
            @click="setScenarioValue('s1', 'bad-date', '1', 'Invalid')"
          >
            Invalid
          </button>
          <button
            type="button"
            :style="buttonStyle('#ff9800')"
            @click="manualBlur('s1', '1')"
          >
            Manual Blur
          </button>
          <button
            type="button"
            :style="buttonStyle('#9c27b0')"
            @click="clearField('s1', '1')"
          >
            clear()
          </button>
          <button
            type="button"
            :style="buttonStyle('#1976d2')"
            @click="callReportValidity('s1', '1')"
          >
            reportValidity()
          </button>
        </div>
      </div>

      <div :style="sectionStyle('#4caf50')">
        <strong>2. Optional — Standalone</strong>
        <div>
          <ix-date-input
            ref="optionalRef"
            label="Optional Date"
            :value="values.s2"
            @valueChange="onValueChange('s2', $event)"
            @blur="inspect('s2', '2')"
          />
        </div>
        <div
          style="
            display: flex;
            gap: 0.4rem;
            margin-top: 0.5rem;
            flex-wrap: wrap;
          "
        >
          <button
            type="button"
            :style="buttonStyle('#607d8b')"
            @click="setScenarioValue('s2', '', '2', 'Empty')"
          >
            Empty
          </button>
          <button
            type="button"
            :style="buttonStyle('#4caf50')"
            @click="setScenarioValue('s2', '2024/12/25', '2', 'Valid')"
          >
            Valid
          </button>
          <button
            type="button"
            :style="buttonStyle('#f44336')"
            @click="setScenarioValue('s2', 'bad-date', '2', 'Invalid')"
          >
            Invalid
          </button>
          <button
            type="button"
            :style="buttonStyle('#ff9800')"
            @click="manualBlur('s2', '2')"
          >
            Manual Blur
          </button>
          <button
            type="button"
            :style="buttonStyle('#9c27b0')"
            @click="clearField('s2', '2')"
          >
            clear()
          </button>
          <button
            type="button"
            :style="buttonStyle('#1976d2')"
            @click="callReportValidity('s2', '2')"
          >
            reportValidity()
          </button>
        </div>
      </div>

      <div :style="sectionStyle('#1976d2')">
        <strong>3. Required — In Form</strong>
        <form @submit.prevent="submitStandardForm($event, '3')">
          <ix-date-input
            ref="formRequiredRef"
            label="Required Date"
            required
            :value="values.s3"
            @valueChange="onValueChange('s3', $event)"
            @blur="inspect('s3', '3')"
          />
          <div
            style="
              display: flex;
              gap: 0.4rem;
              margin-top: 0.5rem;
              flex-wrap: wrap;
            "
          >
            <button
              type="button"
              :style="buttonStyle('#607d8b')"
              @click="setScenarioValue('s3', '', '3', 'Empty')"
            >
              Empty
            </button>
            <button
              type="button"
              :style="buttonStyle('#4caf50')"
              @click="setScenarioValue('s3', '2024/12/25', '3', 'Valid')"
            >
              Valid
            </button>
            <button
              type="button"
              :style="buttonStyle('#f44336')"
              @click="setScenarioValue('s3', 'bad-date', '3', 'Invalid')"
            >
              Invalid
            </button>
            <button
              type="button"
              :style="buttonStyle('#ff9800')"
              @click="manualBlur('s3', '3')"
            >
              Manual Blur
            </button>
            <button
              type="button"
              :style="buttonStyle('#9c27b0')"
              @click="clearField('s3', '3')"
            >
              clear()
            </button>
            <button
              type="button"
              :style="buttonStyle('#1976d2')"
              @click="callReportValidity('s3', '3')"
            >
              reportValidity()
            </button>
            <button type="submit" :style="buttonStyle('#00897b')">
              Submit Form
            </button>
          </div>
        </form>
      </div>

      <div :style="sectionStyle('#00897b')">
        <strong>4. Optional — In Form</strong>
        <form @submit.prevent="submitStandardForm($event, '4')">
          <ix-date-input
            ref="formOptionalRef"
            label="Optional Date"
            :value="values.s4"
            @valueChange="onValueChange('s4', $event)"
            @blur="inspect('s4', '4')"
          />
          <div
            style="
              display: flex;
              gap: 0.4rem;
              margin-top: 0.5rem;
              flex-wrap: wrap;
            "
          >
            <button
              type="button"
              :style="buttonStyle('#607d8b')"
              @click="setScenarioValue('s4', '', '4', 'Empty')"
            >
              Empty
            </button>
            <button
              type="button"
              :style="buttonStyle('#4caf50')"
              @click="setScenarioValue('s4', '2024/12/25', '4', 'Valid')"
            >
              Valid
            </button>
            <button
              type="button"
              :style="buttonStyle('#f44336')"
              @click="setScenarioValue('s4', 'bad-date', '4', 'Invalid')"
            >
              Invalid
            </button>
            <button
              type="button"
              :style="buttonStyle('#ff9800')"
              @click="manualBlur('s4', '4')"
            >
              Manual Blur
            </button>
            <button
              type="button"
              :style="buttonStyle('#9c27b0')"
              @click="clearField('s4', '4')"
            >
              clear()
            </button>
            <button
              type="button"
              :style="buttonStyle('#1976d2')"
              @click="callReportValidity('s4', '4')"
            >
              reportValidity()
            </button>
            <button type="submit" :style="buttonStyle('#00897b')">
              Submit Form
            </button>
          </div>
        </form>
      </div>

      <div :style="sectionStyle('#ff9800')">
        <strong>5. Required — novalidate Form</strong>
        <p style="margin: 0 0 0.4rem 0; font-size: 0.75rem; color: #555">
          Visual errors are suppressed after blur and submit. Explicit
          <code>reportValidity()</code> still surfaces them.
        </p>
        <form novalidate @submit.prevent="submitNoValidateForm('5')">
          <ix-date-input
            ref="noValidateRequiredRef"
            label="Required Date"
            required
            :value="values.s5"
            @valueChange="onValueChange('s5', $event)"
            @blur="inspect('s5', '5')"
          />
          <div
            style="
              display: flex;
              gap: 0.4rem;
              margin-top: 0.5rem;
              flex-wrap: wrap;
            "
          >
            <button
              type="button"
              :style="buttonStyle('#607d8b')"
              @click="setScenarioValue('s5', '', '5', 'Empty')"
            >
              Empty
            </button>
            <button
              type="button"
              :style="buttonStyle('#4caf50')"
              @click="setScenarioValue('s5', '2024/12/25', '5', 'Valid')"
            >
              Valid
            </button>
            <button
              type="button"
              :style="buttonStyle('#f44336')"
              @click="setScenarioValue('s5', 'bad-date', '5', 'Invalid')"
            >
              Invalid
            </button>
            <button
              type="button"
              :style="buttonStyle('#ff9800')"
              @click="manualBlur('s5', '5')"
            >
              Manual Blur
            </button>
            <button
              type="button"
              :style="buttonStyle('#9c27b0')"
              @click="clearField('s5', '5')"
            >
              clear()
            </button>
            <button
              type="button"
              :style="buttonStyle('#1976d2')"
              @click="callReportValidity('s5', '5')"
            >
              reportValidity()
            </button>
            <button type="submit" :style="buttonStyle('#00897b')">
              Submit Form
            </button>
          </div>
        </form>
      </div>

      <div :style="sectionStyle('#9c27b0')">
        <strong>6. Optional — novalidate Form</strong>
        <p style="margin: 0 0 0.4rem 0; font-size: 0.75rem; color: #555">
          Visual errors are suppressed after blur and submit. Explicit
          <code>reportValidity()</code> still surfaces them.
        </p>
        <form novalidate @submit.prevent="submitNoValidateForm('6')">
          <ix-date-input
            ref="noValidateOptionalRef"
            label="Optional Date"
            :value="values.s6"
            @valueChange="onValueChange('s6', $event)"
            @blur="inspect('s6', '6')"
          />
          <div
            style="
              display: flex;
              gap: 0.4rem;
              margin-top: 0.5rem;
              flex-wrap: wrap;
            "
          >
            <button
              type="button"
              :style="buttonStyle('#607d8b')"
              @click="setScenarioValue('s6', '', '6', 'Empty')"
            >
              Empty
            </button>
            <button
              type="button"
              :style="buttonStyle('#4caf50')"
              @click="setScenarioValue('s6', '2024/12/25', '6', 'Valid')"
            >
              Valid
            </button>
            <button
              type="button"
              :style="buttonStyle('#f44336')"
              @click="setScenarioValue('s6', 'bad-date', '6', 'Invalid')"
            >
              Invalid
            </button>
            <button
              type="button"
              :style="buttonStyle('#ff9800')"
              @click="manualBlur('s6', '6')"
            >
              Manual Blur
            </button>
            <button
              type="button"
              :style="buttonStyle('#9c27b0')"
              @click="clearField('s6', '6')"
            >
              clear()
            </button>
            <button
              type="button"
              :style="buttonStyle('#1976d2')"
              @click="callReportValidity('s6', '6')"
            >
              reportValidity()
            </button>
            <button type="submit" :style="buttonStyle('#00897b')">
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>

    <div :style="{ ...sectionStyle('#607d8b'), marginBottom: '1rem' }">
      <strong
        >7. Initial invalid default value — must NOT show red on load (WCAG
        3.3.1)</strong
      >
      <p style="margin: 0.25rem 0 0.5rem 0; font-size: 0.75rem; color: #555">
        Field loads with <code>value="bad-date"</code>. Inspect it immediately —
        no red border should appear until after blur.
      </p>
      <ix-date-input
        ref="initialInvalidRef"
        id="s7-input"
        label="Date with invalid default"
        value="bad-date"
        @blur="inspectInitialInvalid"
      />
      <p style="margin: 0.4rem 0 0; font-size: 0.75rem; color: #888">
        ✅ Expected on load: no <code>is-invalid</code> class on the inner
        input.<br />
        ✅ Expected after blur: <code>is-invalid</code> appears.
      </p>
    </div>

    <div>
      <h3 style="margin: 0 0 0.4rem 0">Event Log</h3>
      <div
        style="
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0.75rem;
          max-height: 280px;
          overflow-y: auto;
          font-family: monospace;
          font-size: 0.78rem;
          background: #fafafa;
        "
      >
        <span v-if="logs.length === 0" style="color: #999; font-style: italic">
          Interact with fields above to see state changes here.
        </span>
        <div
          v-for="entry in logs"
          :key="entry.id"
          :style="{ color: logColor(entry.message), lineHeight: '1.6' }"
        >
          {{ entry.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue';

type ScenarioKey = 's1' | 's2' | 's3' | 's4' | 's5' | 's6';

interface LogEntry {
  id: string;
  message: string;
}

const logs = ref<LogEntry[]>([]);
const values = reactive<Record<ScenarioKey, string>>({
  s1: '',
  s2: '',
  s3: '',
  s4: '',
  s5: '',
  s6: '',
});

const requiredRef = ref<HTMLIxDateInputElement | null>(null);
const optionalRef = ref<HTMLIxDateInputElement | null>(null);
const formRequiredRef = ref<HTMLIxDateInputElement | null>(null);
const formOptionalRef = ref<HTMLIxDateInputElement | null>(null);
const noValidateRequiredRef = ref<HTMLIxDateInputElement | null>(null);
const noValidateOptionalRef = ref<HTMLIxDateInputElement | null>(null);
const initialInvalidRef = ref<HTMLIxDateInputElement | null>(null);

let logCounter = 0;

const scenarioRefs: Record<ScenarioKey, Ref<HTMLIxDateInputElement | null>> = {
  s1: requiredRef,
  s2: optionalRef,
  s3: formRequiredRef,
  s4: formOptionalRef,
  s5: noValidateRequiredRef,
  s6: noValidateOptionalRef,
};

function sectionStyle(color: string) {
  return { border: `1px solid ${color}`, padding: '1rem', borderRadius: '4px' };
}

function buttonStyle(backgroundColor: string) {
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

function log(message: string) {
  logCounter += 1;
  logs.value.push({
    id: `${Date.now()}-${logCounter}`,
    message: `[${new Date().toLocaleTimeString()}] ${message}`,
  });
}

function getScenarioElement(key: ScenarioKey) {
  return scenarioRefs[key].value;
}

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function onValueChange(
  key: ScenarioKey,
  event: CustomEvent<string | undefined>
) {
  values[key] = event.detail ?? '';
}

function setScenarioValue(
  key: ScenarioKey,
  value: string,
  label: string,
  action: string
) {
  values[key] = value;
  log(`${label} -> ${action}`);
}

async function inspect(key: ScenarioKey, label: string) {
  const element = getScenarioElement(key);
  if (!element) {
    return;
  }

  const hostClasses = Array.from(element.classList).filter((className) =>
    className.startsWith('ix-invalid')
  );
  const nativeInput = await element.getNativeInputElement();
  const inputClasses = Array.from(nativeInput.classList).filter((className) =>
    className.startsWith('is-invalid')
  );

  let touched: string | boolean | undefined = undefined;
  try {
    touched = await element.isTouched?.();
  } catch {
    touched = 'error';
  }

  log(
    `${label} | value="${element.value}" required=${element.required} touched=${touched} ` +
      `host=[${hostClasses.join(',')}] input=[${inputClasses.join(',')}]`
  );
}

async function manualBlur(key: ScenarioKey, label: string) {
  const element = getScenarioElement(key);
  if (!element) {
    return;
  }

  const nativeInput = await element.getNativeInputElement();
  nativeInput.focus();
  await delay(30);
  nativeInput.blur();
  await delay(50);
  await inspect(key, `${label} after blur`);
}

async function clearField(key: ScenarioKey, label: string) {
  const element = getScenarioElement(key);
  if (!element) {
    return;
  }

  await element.clear();
  values[key] = '';
  log(`${label} clear() called`);
  await inspect(key, `${label} after clear`);
}

async function callReportValidity(key: ScenarioKey, label: string) {
  const element = getScenarioElement(key);
  if (!element) {
    return;
  }

  const valid = await element.reportValidity();
  log(`${label} reportValidity() -> ${valid ? '✅ valid' : '❌ invalid'}`);
  await inspect(key, `${label} after reportValidity`);
}

function submitStandardForm(event: Event, label: string) {
  const form = event.currentTarget as HTMLFormElement;
  if (!form.reportValidity()) {
    log(`${label} form submit blocked — invalid fields`);
    return;
  }

  log(`${label} form submitted ✅`);
}

function submitNoValidateForm(label: string) {
  log(
    `${label} novalidate form submitted ✅ (submit bypassed validation due to noValidate)`
  );
}

async function inspectInitialInvalid() {
  const element = initialInvalidRef.value;
  if (!element) {
    return;
  }

  const nativeInput = await element.getNativeInputElement();
  const inputClasses = Array.from(nativeInput.classList);
  log(`7 after blur | input classes: [${inputClasses.join(', ')}]`);
}

function logColor(message: string) {
  if (message.includes('❌')) {
    return '#c62828';
  }

  if (message.includes('✅')) {
    return '#2e7d32';
  }

  return 'inherit';
}
</script>

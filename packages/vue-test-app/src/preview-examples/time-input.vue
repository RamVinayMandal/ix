<!--
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
-->
<script setup lang="ts">
import { ref } from 'vue';

const timeValue = ref('');
const timeInputRef = ref<HTMLIxTimeInputElement>();

// Native HTML time input for comparison
const nativeTimeValue = ref('');
const nativeTimeInputRef = ref<HTMLInputElement>();

const onValueChange = (event: any) => {
  const val = event.detail ?? '';
  timeValue.value = val;
  console.log('Value changed to:', val);
};

/**
 * Simulates a user clearing the field (field is empty, touched, and invalid)
 */
const setEmptyProgrammatically = () => {
  console.log('Setting empty programmatically');
  if (timeInputRef.value) {
    timeInputRef.value.value = '';
    timeValue.value = '';
  }
};

/**
 * Simulates a true form reset (field is empty, untouched, and valid)
 */
const resetValue = () => {
  console.log('Resetting value (remove touched state)');
  if (timeInputRef.value) {
    timeInputRef.value.value = null;
    timeValue.value = null;
  }
};

// Native HTML time input handlers
const setNativeEmpty = () => {
  console.log('Setting native time input to empty');
  if (nativeTimeInputRef.value) {
    nativeTimeInputRef.value.value = '';
    nativeTimeValue.value = '';
  }
};

const resetNativeValue = () => {
  console.log('Resetting native time input to 12:00');
  if (nativeTimeInputRef.value) {
    nativeTimeInputRef.value.value = '12:00';
    nativeTimeValue.value = '12:00';
  }
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  console.log('Form submitted:', {
    timeValue: timeValue.value,
    nativeTimeValue: nativeTimeValue.value,
  });

  const form = e.target as HTMLFormElement;
  console.log('Form validity:', form.checkValidity());
};
</script>

<template>
  <form @submit="handleSubmit">
    <div style="margin-bottom: 2rem">
      <h3>Raw Web Component (ix-time-input)</h3>
      <ix-time-input
        ref="timeInputRef"
        @valueChange="onValueChange"
        name="timeValue"
        required
        label="Time Input Example (Required)"
        placeholder="Enter time (HH:mm)"
        helper-text="This field is required - try submitting without a value"
        invalid-text="Please enter a valid time"
        i18n-error-time-unparsable="The time format is not parsable"
      ></ix-time-input>

      <div style="margin-top: 1rem">
        <button type="button" @click="setEmptyProgrammatically">
          Set Empty Programmatically
        </button>
        <button type="button" @click="resetValue">
          Reset Value (remove touched state)
        </button>
      </div>

      <div style="margin-top: 1rem">
        <div>Current Value: {{ timeValue }}</div>
      </div>
    </div>

    <div
      style="margin-bottom: 2rem; border-top: 2px solid #ccc; padding-top: 2rem"
    >
      <h3>Native HTML Time Input (for comparison)</h3>
      <div style="margin-bottom: 1rem">
        <label for="nativeTime">Native Time Input:</label>
        <input
          id="nativeTime"
          ref="nativeTimeInputRef"
          type="time"
          v-model="nativeTimeValue"
          required
          style="
            margin-left: 10px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          "
        />
      </div>

      <div style="margin-top: 1rem">
        <button type="button" @click="setNativeEmpty">Set Native Empty</button>
        <button type="button" @click="resetNativeValue">
          Reset Native to 12:00
        </button>
      </div>

      <div style="margin-top: 1rem">
        <div>Native Value: {{ nativeTimeValue }}</div>
      </div>
    </div>

    <button
      type="submit"
      style="
        margin-top: 16px;
        padding: 10px 20px;
        background: #007acc;
        color: white;
        border: none;
        border-radius: 4px;
      "
    >
      Submit Form
    </button>
  </form>
</template>

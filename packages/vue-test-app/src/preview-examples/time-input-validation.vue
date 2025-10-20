<!--
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
-->

<script setup lang="ts">
import { IxTimeInput } from '@siemens/ix-vue';
import { ref } from 'vue';

const timeValue1 = ref('');
const timeValue2 = ref('');
const timeValue3 = ref('');
const timeInputRef = ref<HTMLIxTimeInputElement>();
const formMessage = ref('');

const handleSubmitWithValidation = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  console.log('=== FORM 1: HTML5 Validation Enabled ===');
  console.log('Form submitted with HTML5 validation enabled');

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log('Form data:', data);

  // HTML5 validation check
  if (form.checkValidity()) {
    console.log('✅ Form is valid according to HTML5 validation');
    formMessage.value = '✅ Form submitted successfully! HTML5 validation passed.';
  } else {
    console.log('❌ Form is invalid according to HTML5 validation');
    formMessage.value = '❌ Form validation failed. Please check the fields.';
    // Trigger HTML5 validation display
    form.reportValidity();
  }
  console.log('==========================================');
};

const handleSubmitWithoutValidation = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  console.log('=== FORM 2: Internal Validation (noValidate) ===');
  console.log('Form submitted with noValidate (HTML5 validation bypassed)');

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log('Form data:', data);

  // Manual validation check could be added here
  console.log('✅ Form submitted with internal validation handling');
  formMessage.value = '✅ Form submitted with internal validation! Check the logs.';
  console.log('==========================================');
};
</script>

<template>
  <div style="padding: 20px; max-width: 800px; height: 700px; overflow: auto;">
    <h1>Vue Time Input - NoValidate Test</h1>

    <!-- Form 1: HTML5 Validation Enabled -->
    <div style="margin-bottom: 30px;">
      <h2>1. Form with HTML5 Validation Enabled</h2>
      <form
        @submit="handleSubmitWithValidation"
        style="border: 1px solid #ccc; padding: 15px; border-radius: 4px;"
      >
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">
            <strong>Required Time Field:</strong>
          </div>
          <IxTimeInput
            name="time1"
            label="Required Time"
            placeholder="Enter time (HH:mm)"
            required
            v-model="timeValue1"
          />

          <div style="margin-top: 5px; font-size: 12px; color: #666;">
            Expected: Native HTML5 validation tooltip on submit, no red borders
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">
            <strong>Optional Time Field:</strong>
          </div>
          <IxTimeInput
            name="time2"
            label="Optional Time"
            placeholder="Enter time (HH:mm)"
            v-model="timeValue2"
          />
        </div>

        <button type="submit" style="margin-top: 10px;">
          Submit Form (HTML5 Validation)
        </button>
      </form>

      <div v-if="formMessage" style="margin-top: 10px; padding: 10px; background: #f0f8ff; border: 1px solid #007acc; border-radius: 4px;">
        {{ formMessage }}
      </div>

      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <strong>Test:</strong> Click submit without filling required field. Should show native browser validation tooltip.
      </p>
    </div>

    <!-- Form 2: Internal Validation (noValidate) -->
    <div style="margin-bottom: 30px;">
      <h2>2. Form with Internal Validation (noValidate={true})</h2>
      <form
        novalidate
        @submit="handleSubmitWithoutValidation"
        style="border: 1px solid #ccc; padding: 15px; border-radius: 4px;"
      >
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">
            <strong>Required Time Field:</strong>
          </div>
          <IxTimeInput
            name="time3"
            label="Required Time"
            placeholder="Enter time (HH:mm)"
            required
            v-model="timeValue3"
          />

          <div style="margin-top: 5px; font-size: 12px; color: #666;">
            Expected: Internal validation (red borders) on submit and interaction
          </div>
        </div>

        <button type="submit" style="margin-top: 10px;">
          Submit Form (Internal Validation)
        </button>
      </form>

      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <strong>Test:</strong> Click submit without filling required field. Should show red borders and validation styling.
      </p>
    </div>

    <!-- Native HTML Time Input Comparison -->
    <div style="margin-bottom: 30px;">
      <h2>3. Native HTML Time Input (for comparison)</h2>
      <form
        @submit="(e) => { e.preventDefault(); console.log('Native form submitted'); }"
        style="border: 1px solid #ccc; padding: 15px; border-radius: 4px;"
      >
        <div style="margin-bottom: 15px;">
          <label for="nativeTime" style="display: block; margin-bottom: 5px;">
            <strong>Native Time Input:</strong>
          </label>
          <input
            id="nativeTime"
            name="nativeTime"
            type="time"
            required
            style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
          />

          <div style="margin-top: 5px; font-size: 12px; color: #666;">
            Reference: Native browser validation behavior
          </div>
        </div>

        <button type="submit" style="margin-top: 10px;">
          Submit Native Form
        </button>
      </form>

      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <strong>Reference:</strong> This shows how native time input behaves with HTML5 validation.
      </p>
    </div>

    <!-- Debug Information -->
    <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 4px;">
      <h3>Debug Information</h3>
      <div style="font-family: monospace; font-size: 12px;">
        <div>Form 1 Value: {{ timeValue1 || 'empty' }}</div>
        <div>Form 2 Value: {{ timeValue3 || 'empty' }}</div>
        <div>Optional Field Value: {{ timeValue2 || 'empty' }}</div>
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        Open browser console to see detailed form submission logs.
      </p>
    </div>
  </div>
</template>

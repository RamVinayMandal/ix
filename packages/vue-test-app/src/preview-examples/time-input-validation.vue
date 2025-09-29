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

const timeValue = ref('');
const timeInputRef = ref<HTMLIxTimeInputElement>();
const formMessage = ref('');

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  formMessage.value = '';
  // HTML5 validation check
  if (form.checkValidity()) {
    formMessage.value = '✅ Form is valid (HTML5 validation passed)';
  } else {
    formMessage.value = '❌ Form is invalid (HTML5 validation failed)';
  }
};

const handleNoValidateSubmit = (e: Event) => {
  e.preventDefault();
  formMessage.value = 'Form submitted with noValidate (HTML5 validation bypassed)';
};
</script>

<template>
  <h2>Vue Form Validation with IxTimeInput</h2>

  <div style="margin-bottom: 2rem;">
    <h3>1. Form with HTML5 Validation (default)</h3>
    <form @submit="handleSubmit" style="border: 1px solid #ccc; padding: 15px; border-radius: 4px;">
      <IxTimeInput
        required
        ref="timeInputRef"
        name="timeValue"
        label="Time (required)"
        placeholder="Enter time (HH:mm)"
        info-text="This field is required"
        invalid-text="Please enter a valid time"
      />
      <button type="submit" style="margin-top: 1rem;">Submit Form</button>
    </form>
    <div v-if="formMessage" style="margin-top: 1rem; color: #007acc;">{{ formMessage }}</div>
    <p><small>Submitting will trigger browser HTML5 validation.</small></p>
  </div>

  <div style="margin-bottom: 2rem;">
    <h3>2. Form with noValidate</h3>
    <form novalidate @submit="handleNoValidateSubmit" style="border: 1px solid #ccc; padding: 15px; border-radius: 4px;">
      <IxTimeInput
        required
        name="timeValueNoValidate"
        label="Time (required, noValidate)"
        placeholder="Enter time (HH:mm)"
        info-text="This field is required"
        invalid-text="Please enter a valid time"
      />
      <button type="submit" style="margin-top: 1rem;">Submit Form (noValidate)</button>
    </form>
    <div v-if="formMessage && $el.querySelector('form[novalidate]')" style="margin-top: 1rem; color: #dc3545;">{{ formMessage }}</div>
    <p><small>Submitting will bypass browser HTML5 validation.</small></p>
  </div>

  <div>
    <IxTimeInput warning-text="Warning text" class="ix-warning"></IxTimeInput>
  </div>

  <div>
    <IxTimeInput valid-text="Valid text" class="ix-valid"></IxTimeInput>
  </div>

  <div>
    <IxTimeInput invalid-text="Invalid text" class="ix-invalid"></IxTimeInput>
  </div>
</template>

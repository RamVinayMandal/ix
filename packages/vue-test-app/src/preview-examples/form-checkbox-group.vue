<!--
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
-->

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IxCheckbox, IxCheckboxGroup } from '@siemens/ix-vue';

// Initial states
const initialFormState = {
  agreed: false,
  most: false,
};

const initialTouched = {
  agreed: false,
  most: false,
};

// Reactive state
const form = ref({ ...initialFormState });
const touched = ref({ ...initialTouched });

// Computed properties
const isValid = computed(() => form.value.agreed || form.value.most);
const shouldShowError = computed(
  () => !isValid.value && (touched.value.agreed || touched.value.most)
);

// Event handlers
const handleCheckboxChange = (name: string, checked: boolean) => {
  console.log(`Checkbox ${name} changed to: ${checked}`);
  // Update reactive values properly
  if (name === 'agreed') {
    form.value.agreed = checked;
    touched.value.agreed = true;
  } else if (name === 'most') {
    form.value.most = checked;
    touched.value.most = true;
  }
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  // Mark all as touched on submit attempt
  touched.value.agreed = true;
  touched.value.most = true;
  console.log('=== CHECKBOX GROUP FORM SUBMISSION ===');
  console.log('Form submitted with values:', form.value);
  console.log('Form Valid (at least one required):', isValid.value);
  console.log('Form Touched:', touched.value);
  console.log('Should Show Error:', shouldShowError.value);
  console.log('====================================');
};

// Test reset functionality - should clear both values and touched state
const handleReset = () => {
  console.log('=== FORM RESET TEST ===');
  console.log('Before reset - Values:', form.value);
  console.log('Before reset - Touched:', touched.value);
  console.log('Before reset - Should Show Error:', shouldShowError.value);

  // Reset both form values and touched state properly for Vue reactivity
  form.value.agreed = false;
  form.value.most = false;
  touched.value.agreed = false;
  touched.value.most = false;

  console.log('After reset - Values:', form.value);
  console.log('After reset - Touched:', touched.value);
  console.log(
    'After reset - Should Show Error: false (because touched is reset)'
  );
  console.log('===========================');
};

const handleTouchCheckboxes = () => {
  console.log('=== MANUALLY TOUCHING CHECKBOXES ===');
  touched.value.agreed = true;
  touched.value.most = true;
  console.log('All checkboxes marked as touched for testing');
  console.log('=====================================');
};
</script>

<template>
  <div style="padding: 20px; max-width: 600px; height: 600px; overflow: scroll">
    <h2>IX Checkbox Group - Required & Reset Testing (Vue)</h2>

    <form
      @submit="handleSubmit"
      style="
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 4px;
        margin-bottom: 20px;
      "
    >
      <h3>Terms Agreement Form (Required)</h3>

      <IxCheckboxGroup
        label="Terms of something (At least one required)"
        :invalid-text="
          shouldShowError ? 'Please select at least one option' : ''
        "
      >
        <IxCheckbox
          label="I agree everything"
          name="agreed"
          :checked="form.agreed"
          @checkedChange="(e: CustomEvent<boolean>) => handleCheckboxChange('agreed', e.detail)"
        />
        <IxCheckbox
          label="I agree with most of it"
          name="most"
          :checked="form.most"
          @checkedChange="(e: CustomEvent<boolean>) => handleCheckboxChange('most', e.detail)"
        />
      </IxCheckboxGroup>

      <div style="margin-top: 20px">
        <button
          type="submit"
          style="
            padding: 8px 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            margin-right: 10px;
          "
        >
          Submit
        </button>
        <button
          type="button"
          @click="handleReset"
          style="
            padding: 8px 16px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            margin-right: 10px;
          "
        >
          Reset (Test)
        </button>
        <button
          type="button"
          @click="handleTouchCheckboxes"
          style="
            padding: 8px 16px;
            background: #ffc107;
            color: black;
            border: none;
            border-radius: 4px;
          "
        >
          Touch All (Test)
        </button>
      </div>

      <div
        style="
          margin-top: 15px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
        "
      >
        <div><strong>Test Status:</strong></div>
        <div>
          ✓ I agree everything: {{ form.agreed ? 'Checked' : 'Unchecked' }}
          {{ touched.agreed ? '(Touched)' : '(Untouched)' }}
        </div>
        <div>
          ✓ I agree with most of it: {{ form.most ? 'Checked' : 'Unchecked' }}
          {{ touched.most ? '(Touched)' : '(Untouched)' }}
        </div>
        <div>✓ Form Valid (at least one): {{ isValid ? 'true' : 'false' }}</div>
        <div>✓ Should Show Error: {{ shouldShowError ? 'true' : 'false' }}</div>
        <div>
          ✓ Any Touched:
          {{ Object.values(touched).some(Boolean) ? 'true' : 'false' }}
        </div>
      </div>
    </form>

    <!-- Test Instructions -->
    <div style="background: #e3f2fd; padding: 15px; border-radius: 4px">
      <h3>🧪 Test Scenario:</h3>
      <ol>
        <li>
          <strong>Initial State:</strong> Both checkboxes unchecked and
          untouched - No error should show
        </li>
        <li>
          <strong>Touch Test:</strong> Click "Touch All" - Error should appear
          (touched but invalid)
        </li>
        <li>
          <strong>Reset Test:</strong> Click "Reset" - Error should disappear
          (values and touched state reset)
        </li>
        <li>
          <strong>Manual Test:</strong> Check one checkbox, then uncheck it -
          Error should appear
        </li>
        <li>
          <strong>Reset Again:</strong> Click "Reset" - Error should disappear
          again
        </li>
      </ol>
      <p>
        <strong>Expected:</strong> Reset should clear both checkbox values AND
        touched state, making validation error disappear.
      </p>
    </div>
  </div>
</template>

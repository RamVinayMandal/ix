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

// Clear method test state
const clearTestValue = ref('');
const clearTestTimeInputRef = ref<HTMLIxTimeInputElement>();

// Form state management
const timeValue1 = ref('');
const timeValue2 = ref('');
const timeValue3 = ref('');
const timeValue4 = ref('');
const timeValue5 = ref('');
const timeValue6 = ref('');

// Native form state management
interface FormData {
  nativeStartTime: string;
  nativeEndTime: string;
  nativeBreakTime: string;
}

interface FormErrors {
  nativeStartTime?: string;
  nativeEndTime?: string;
  nativeBreakTime?: string;
}

const nativeFormData = ref<FormData>({
  nativeStartTime: '',
  nativeEndTime: '',
  nativeBreakTime: ''
});

const nativeFormErrors = ref<FormErrors>({});
const touched = ref<{ [key: string]: boolean }>({});
const nativeFormRef = ref<HTMLFormElement>();

// Form submission handlers
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
  } else {
    console.log('❌ Form is invalid according to HTML5 validation');
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
  console.log('==========================================');
};

const handleSubmitDefault = (event: Event) => {
  event.preventDefault();
  console.log('=== FORM 3: Vue Default (No HTML5 Validation) ===');
  console.log('Form submitted with Vue default behavior (novalidate)');

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  console.log('Form data:');
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  console.log('Note: HTML5 validation is disabled by Vue default');
  console.log('====================================================');
};

const handleSubmitNative = (event: Event) => {
  event.preventDefault();
  console.log('=== FORM 4: Native Form Validation ===');
  console.log('Form submitted with native validation');

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  console.log('Form data:');
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  // Trigger native form validation
  if (form.checkValidity()) {
    console.log('✅ Native form is valid');
  } else {
    console.log('❌ Native form is invalid');
    form.reportValidity();
  }
  console.log('==========================================');
};

// Reset and Clear handlers
const handleNativeReset = () => {
  console.log('=== NATIVE FORM RESET ===');

  // Reset all reactive data
  nativeFormData.value = {
    nativeStartTime: '',
    nativeEndTime: '',
    nativeBreakTime: ''
  };
  nativeFormErrors.value = {};
  touched.value = {};

  // Also trigger browser's native form reset
  if (nativeFormRef.value) {
    nativeFormRef.value.reset();
  }

  console.log('Native form has been reset');
  console.log('==========================');
};

const handleNativeClear = () => {
  console.log('=== CLEAR ALL NATIVE FIELDS ===');

  // Clear all fields manually
  nativeFormData.value.nativeStartTime = '';
  nativeFormData.value.nativeEndTime = '';
  nativeFormData.value.nativeBreakTime = '';

  console.log('All native fields cleared');
  console.log('================================');
};

// Handle input changes for validation
const handleNativeInputChange = (field: keyof FormData, value: string) => {
  nativeFormData.value[field] = value;
  touched.value[field] = true;

  // Clear error when user starts typing
  if (nativeFormErrors.value[field]) {
    delete nativeFormErrors.value[field];
  }
};

// Clear method test functions
const handleClearMethodTest = async () => {
  console.log('=== CLEAR METHOD TEST ===');
  console.log('Using clear() method to properly reset validation');
  if (clearTestTimeInputRef.value) {
    await clearTestTimeInputRef.value.clear();
    clearTestValue.value = '';  // Also update v-model
    console.log('✅ Time input cleared using clear() method');
  } else {
    console.log('❌ Time input ref not available');
  }
  console.log('=========================');
};

// Form reset handlers for other forms
const handleReset1 = () => {
  console.log('=== FORM 1 RESET ===');
  timeValue1.value = '';
  timeValue2.value = '';
  console.log('Form 1 values reset');
  console.log('===================');
};

const handleClear1 = () => {
  console.log('=== FORM 1 CLEAR ===');
  timeValue1.value = '';
  timeValue2.value = '';
  console.log('Form 1 values cleared');
  console.log('===================');
};

const handleReset2 = () => {
  console.log('=== FORM 2 RESET ===');
  timeValue3.value = '';
  console.log('Form 2 values reset');
  console.log('===================');
};

const handleClear2 = () => {
  console.log('=== FORM 2 CLEAR ===');
  timeValue3.value = '';
  console.log('Form 2 values cleared');
  console.log('===================');
};

const handleReset3 = () => {
  console.log('=== FORM 3 RESET ===');
  timeValue4.value = '';
  timeValue5.value = '';
  console.log('Form 3 values reset');
  console.log('===================');
};

const handleClear3 = () => {
  console.log('=== FORM 3 CLEAR ===');
  timeValue4.value = '';
  timeValue5.value = '';
  console.log('Form 3 values cleared');
  console.log('===================');
};
</script>

<template>
  <div style="padding: 20px; max-width: 1000px; height: 800px; overflow: auto;">
    <h1>Vue Time Input - NoValidate Comprehensive Test</h1>
    <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
      This test demonstrates time input validation behavior across different form configurations.
      Open browser console to see detailed validation logs.
    </p>

    <!-- Form 1: HTML5 Validation Enabled -->
    <div style="margin-bottom: 40px;">
      <h2>1. Form with HTML5 Validation Enabled</h2>
      <form
        @submit="handleSubmitWithValidation"
        style="border: 2px solid #28a745; padding: 20px; border-radius: 8px; background: #f8fff9;"
      >
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">
            <strong>Required Start Time:</strong>
          </div>
          <IxTimeInput
            name="startTime1"
            label="Start Time"
            placeholder="Enter start time (HH:mm)"
            required
            v-model="timeValue1"
          />
          <div style="margin-top: 5px; font-size: 12px; color: #666;">
            Expected: Native HTML5 validation tooltip on submit, consistent styling
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="margin-bottom: 5px;">
            <strong>Optional End Time:</strong>
          </div>
          <IxTimeInput
            name="endTime1"
            label="End Time"
            placeholder="Enter end time (HH:mm)"
            v-model="timeValue2"
          />
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="submit" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px;">
            Submit Form (HTML5 Validation)
          </button>
          <button type="button" @click="handleReset1" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px;">
            Reset Form
          </button>
          <button type="button" @click="handleClear1" style="padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px;">
            Clear Fields
          </button>
        </div>
      </form>

      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <strong>Test:</strong> Click submit without filling required field. Should show native browser validation tooltip.
      </p>
    </div>

    <!-- Form 2: Internal Validation (noValidate) -->
    <div style="margin-bottom: 40px;">
      <h2>2. Form with Internal Validation (noValidate={true})</h2>
      <form
        novalidate
        @submit="handleSubmitWithoutValidation"
        style="border: 2px solid #ffc107; padding: 20px; border-radius: 8px; background: #fffbf0;"
      >
        <div style="margin-bottom: 20px;">
          <div style="margin-bottom: 5px;">
            <strong>Required Meeting Time:</strong>
          </div>
          <IxTimeInput
            name="meetingTime"
            label="Meeting Time"
            placeholder="Enter meeting time (HH:mm)"
            required
            v-model="timeValue3"
          />
          <div style="margin-top: 5px; font-size: 12px; color: #666;">
            Expected: Internal validation (red borders) on submit and interaction
          </div>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="submit" style="padding: 8px 16px; background: #ffc107; color: #212529; border: none; border-radius: 4px;">
            Submit Form (Internal Validation)
          </button>
          <button type="button" @click="handleReset2" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px;">
            Reset Form
          </button>
          <button type="button" @click="handleClear2" style="padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px;">
            Clear Fields
          </button>
        </div>
      </form>

      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <strong>Test:</strong> Click submit without filling required field. Should show internal validation styling.
      </p>
    </div>

    <!-- Form 3: Vue Default Behavior -->
    <div style="margin-bottom: 40px;">
      <h2>3. Vue Default Form Behavior</h2>
      <form
        @submit="handleSubmitDefault"
        style="border: 2px solid #17a2b8; padding: 20px; border-radius: 8px; background: #f0f9ff;"
      >
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">
            <strong>Required Work Start:</strong>
          </div>
          <IxTimeInput
            name="workStart"
            label="Work Start Time"
            placeholder="Enter work start time"
            required
            v-model="timeValue4"
          />
        </div>

        <div style="margin-bottom: 20px;">
          <div style="margin-bottom: 5px;">
            <strong>Required Work End:</strong>
          </div>
          <IxTimeInput
            name="workEnd"
            label="Work End Time"
            placeholder="Enter work end time"
            required
            v-model="timeValue5"
          />
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="submit" style="padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px;">
            Submit Vue Default Form
          </button>
          <button type="button" @click="handleReset3" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px;">
            Reset Form
          </button>
          <button type="button" @click="handleClear3" style="padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px;">
            Clear Fields
          </button>
        </div>
      </form>

      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <strong>Note:</strong> Vue automatically adds novalidate to forms, so this behaves like internal validation.
      </p>
    </div>

    <!-- Form 4: Native Form with Time Inputs -->
    <div style="margin-bottom: 40px;">
      <h2>4. Native Form with IX Time Inputs and Reset/Clear</h2>
      <form
        ref="nativeFormRef"
        @submit="handleSubmitNative"
        style="border: 2px solid #dc3545; padding: 20px; border-radius: 8px; background: #fff5f5;"
      >
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">
            <strong>Start Time (Required):</strong>
          </div>
          <IxTimeInput
            name="nativeStartTime"
            label="Start Time"
            placeholder="Enter start time"
            required
            :value="nativeFormData.nativeStartTime"
            @ix-input="(e) => handleNativeInputChange('nativeStartTime', e.detail)"
          />
          <div v-if="nativeFormErrors.nativeStartTime" style="color: #dc3545; font-size: 12px; margin-top: 2px;">
            {{ nativeFormErrors.nativeStartTime }}
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">
            <strong>End Time (Required):</strong>
          </div>
          <IxTimeInput
            name="nativeEndTime"
            label="End Time"
            placeholder="Enter end time"
            required
            :value="nativeFormData.nativeEndTime"
            @ix-input="(e) => handleNativeInputChange('nativeEndTime', e.detail)"
          />
          <div v-if="nativeFormErrors.nativeEndTime" style="color: #dc3545; font-size: 12px; margin-top: 2px;">
            {{ nativeFormErrors.nativeEndTime }}
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="margin-bottom: 5px;">
            <strong>Break Time (Optional):</strong>
          </div>
          <IxTimeInput
            name="nativeBreakTime"
            label="Break Time"
            placeholder="Enter break time"
            :value="nativeFormData.nativeBreakTime"
            @ix-input="(e) => handleNativeInputChange('nativeBreakTime', e.detail)"
          />
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="submit" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px;">
            Submit Native Form
          </button>
          <button type="button" @click="handleNativeReset" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px;">
            Reset Form
          </button>
          <button type="button" @click="handleNativeClear" style="padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px;">
            Clear Fields
          </button>
        </div>
      </form>

      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <strong>Test:</strong> This form uses native state management with reset and clear functionality.
      </p>
    </div>

    <!-- Clear Method Test Section -->
    <div style="margin-bottom: 40px;">
      <h2>5. Clear Method Test</h2>
      <div style="border: 2px solid #6f42c1; padding: 20px; border-radius: 8px; background: #f8f5ff;">
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">
            <strong>Time Input with Clear Method:</strong>
          </div>
          <IxTimeInput
            ref="clearTestTimeInputRef"
            name="clearTestTime"
            label="Test Clear Method"
            placeholder="Enter time to test clear"
            required
            v-model="clearTestValue"
          />
          <div style="margin-top: 5px; font-size: 12px; color: #666;">
            Test the clear() method that properly resets validation state
          </div>
        </div>

        <button
          type="button"
          @click="handleClearMethodTest"
          style="padding: 8px 16px; background: #6f42c1; color: white; border: none; border-radius: 4px;"
        >
          Call clear() Method
        </button>

        <p style="font-size: 12px; color: #666; margin-top: 10px;">
          <strong>Test:</strong> Enter a time, then click the clear button to test the clear() method.
        </p>
      </div>
    </div>

    <!-- Native HTML Time Input Comparison -->
    <div style="margin-bottom: 40px;">
      <h2>6. Native HTML Time Input (Reference)</h2>
      <form
        @submit="(e) => { e.preventDefault(); console.log('Native HTML form submitted'); }"
        style="border: 2px solid #868e96; padding: 20px; border-radius: 8px; background: #f8f9fa;"
      >
        <div style="margin-bottom: 20px;">
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

        <button type="submit" style="padding: 8px 16px; background: #868e96; color: white; border: none; border-radius: 4px;">
          Submit Native HTML Form
        </button>
      </form>

      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <strong>Reference:</strong> This shows how native time input behaves with HTML5 validation.
      </p>
    </div>

    <!-- Debug Information -->
    <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
      <h3>Debug Information</h3>
      <div style="font-family: monospace; font-size: 12px; line-height: 1.4;">
        <div><strong>Form 1:</strong></div>
        <div style="margin-left: 20px;">Start Time: {{ timeValue1 || 'empty' }}</div>
        <div style="margin-left: 20px;">End Time: {{ timeValue2 || 'empty' }}</div>

        <div style="margin-top: 10px;"><strong>Form 2:</strong></div>
        <div style="margin-left: 20px;">Meeting Time: {{ timeValue3 || 'empty' }}</div>

        <div style="margin-top: 10px;"><strong>Form 3:</strong></div>
        <div style="margin-left: 20px;">Work Start: {{ timeValue4 || 'empty' }}</div>
        <div style="margin-left: 20px;">Work End: {{ timeValue5 || 'empty' }}</div>

        <div style="margin-top: 10px;"><strong>Form 4 (Native):</strong></div>
        <div style="margin-left: 20px;">Start Time: {{ nativeFormData.nativeStartTime || 'empty' }}</div>
        <div style="margin-left: 20px;">End Time: {{ nativeFormData.nativeEndTime || 'empty' }}</div>
        <div style="margin-left: 20px;">Break Time: {{ nativeFormData.nativeBreakTime || 'empty' }}</div>

        <div style="margin-top: 10px;"><strong>Clear Test:</strong></div>
        <div style="margin-left: 20px;">Clear Test Value: {{ clearTestValue || 'empty' }}</div>
      </div>

      <p style="font-size: 12px; color: #666; margin-top: 15px;">
        Open browser console to see detailed form submission logs and validation behavior.
      </p>
    </div>
  </div>
</template>

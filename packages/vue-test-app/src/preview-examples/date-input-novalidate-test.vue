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
import { IxDateInput } from '@siemens/ix-vue';

// Clear method test state
const clearTestValue = ref('');
const clearTestDateInputRef = ref<any>(null);

// Native form state management
interface FormData {
  nativeBirthDate: string;
  nativeStartDate: string;
  nativeEndDate: string;
}

interface FormErrors {
  nativeBirthDate?: string;
  nativeStartDate?: string;
  nativeEndDate?: string;
}

const nativeFormData = ref<FormData>({
  nativeBirthDate: '',
  nativeStartDate: '',
  nativeEndDate: ''
});

const nativeFormErrors = ref<FormErrors>({});
const touched = ref<{ [key: string]: boolean }>({});

const nativeFormRef = ref<HTMLFormElement>();

// Helper function to validate native form
const validateNativeForm = (): FormErrors => {
  const errors: FormErrors = {};

  if (!nativeFormData.value.nativeBirthDate.trim()) {
    errors.nativeBirthDate = 'Birth date is required';
  }

  if (!nativeFormData.value.nativeEndDate.trim()) {
    errors.nativeEndDate = 'End date is required';
  }

  return errors;
};

// Computed properties for form status
const isNativeFormValid = computed(() => Object.keys(validateNativeForm()).length === 0);
const isNativeFormTouched = computed(() => Object.values(touched.value).some(Boolean));
const isNativeFormDirty = computed(() => Object.values(nativeFormData.value).some(value => value.trim() !== ''));

// Handle form submissions
const handleSubmitWithValidation = (event: Event) => {
  event.preventDefault();
  console.log('=== FORM 1: HTML5 Validation Enabled ===');
  console.log('Form submitted with HTML5 validation enabled');

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  console.log('Form data:');
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  // Check if form is valid using HTML5 validation
  if (form.checkValidity()) {
    console.log('✅ Form is valid according to HTML5 validation');
  } else {
    console.log('❌ Form is invalid according to HTML5 validation');
  }
  console.log('==========================================');
};

const handleSubmitDefault = (event: Event) => {
  event.preventDefault();
  console.log('=== FORM 2: Vue Default (No HTML5 Validation) ===');
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

const handleSubmitExplicitNoValidate = (event: Event) => {
  event.preventDefault();
  console.log('=== FORM 3: Explicit NoValidate ===');
  console.log('Form submitted with explicit novalidate attribute');

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  console.log('Form data:');
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  console.log('Note: HTML5 validation is explicitly disabled');
  console.log('=====================================');
};

// Native form handlers
const handleNativeSubmit = (event: Event) => {
  event.preventDefault();
  const errors = validateNativeForm();
  nativeFormErrors.value = errors;

  if (Object.keys(errors).length === 0) {
    console.log('=== NATIVE FORM SUBMISSION ===');
    console.log('Native Form Values:', nativeFormData.value);
    alert('Native form submitted successfully!\nCheck console for details.');
  } else {
    console.log('=== NATIVE FORM VALIDATION FAILED ===');
    console.log('Native Form Errors:', errors);
    // Mark all fields as touched to show errors
    touched.value = {
      nativeBirthDate: true,
      nativeStartDate: true,
      nativeEndDate: true
    };
  }
};

const handleNativeReset = () => {
  console.log('=== NATIVE FORM RESET ===');
  nativeFormData.value = {
    nativeBirthDate: '',
    nativeStartDate: '',
    nativeEndDate: ''
  };
  nativeFormErrors.value = {};
  touched.value = {};

  // Also trigger browser's native form reset
  if (nativeFormRef.value) {
    nativeFormRef.value.reset();
  }
  console.log('Native form has been reset');
};

const handleNativeClear = () => {
  console.log('=== CLEAR ALL NATIVE FIELDS ===');
  nativeFormData.value = {
    nativeBirthDate: '',
    nativeStartDate: '',
    nativeEndDate: ''
  };
  console.log('All native fields cleared');
};

// Handle input changes for native form
const handleNativeInputChange = (field: keyof FormData, value: string) => {
  nativeFormData.value[field] = value;

  // Clear error when user starts typing
  if (nativeFormErrors.value[field]) {
    delete nativeFormErrors.value[field];
  }
};

const handleNativeInputBlur = (field: keyof FormData) => {
  touched.value[field] = true;
};

// Clear method test functions
const handleClearMethodTest = async () => {
  console.log('=== CLEAR METHOD TEST ===');
  console.log('Using clear() method to properly reset validation');
  if (clearTestDateInputRef.value) {
    await clearTestDateInputRef.value.clear();
    clearTestValue.value = '';  // Also update v-model
    console.log('✅ Clear method called successfully');
  } else {
    console.log('❌ Date input ref not available');
  }
};

const handleVModelClear = () => {
  console.log('=== V-MODEL CLEAR TEST ===');
  console.log('Using v-model to clear (may not reset touched state)');
  clearTestValue.value = '';
  console.log('V-model cleared to empty string');
};

const handleSetInvalidDate = () => {
  console.log('=== SET INVALID DATE ===');
  clearTestValue.value = 'invalid-date';
  console.log('Set invalid date via v-model');
};
</script>

<template>
  <div style="padding: 20px; max-width: 800px; height: 700px; overflow: scroll">
    <h2>Date Input - NoValidate Testing (Vue)</h2>

    <!-- Form with validation (default) -->
    <div style="margin-bottom: 30px">
      <h3>1. Form with HTML5 Validation Enabled</h3>
      <form
        @submit="handleSubmitWithValidation"
        :novalidate="false"
        style="border: 1px solid #ccc; padding: 15px; border-radius: 4px"
      >
        <div style="margin-bottom: 15px">
          <div style="margin-bottom: 5px">
            <strong>Required Date Input:</strong>
          </div>
          <IxDateInput
            name="date1"
            label="Required Date"
            placeholder="Enter date (YYYY/MM/DD)"
            required
          />

          <div style="margin-top: 10px">
            <IxDateInput
              name="date1b"
              label="Optional Date"
              placeholder="Enter date (YYYY/MM/DD)"
            />
          </div>
        </div>

        <div style="margin-bottom: 15px">
          <div style="margin-bottom: 5px">
            <strong>Date with Min/Max Range:</strong>
          </div>
          <IxDateInput
            name="date2"
            label="Date Range"
            placeholder="Date range 2023-2025"
            min-date="2023/01/01"
            max-date="2025/12/31"
            required
          />
        </div>

        <button
          type="submit"
          style="
            padding: 8px 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
          "
        >
          Submit Form
        </button>
      </form>
      <p>
        <small>This form has :novalidate="false" to enable HTML5 validation</small>
      </p>
    </div>

    <!-- Native HTML Date Form -->
    <div style="margin-bottom: 30px">
      <h3>Native HTML Date Form (for comparison)</h3>

      <form
        ref="nativeFormRef"
        @submit="handleNativeSubmit"
        :novalidate="false"
        style="
          border: 1px solid #007bff;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
        "
      >
        <div style="margin-bottom: 20px">
          <label
            for="nativeBirthDate"
            style="display: block; margin-bottom: 5px; font-weight: bold"
          >
            Birth Date *
          </label>
          <input
            type="date"
            id="nativeBirthDate"
            name="nativeBirthDate"
            :value="nativeFormData.nativeBirthDate"
            @input="(e) => handleNativeInputChange('nativeBirthDate', (e.target as HTMLInputElement).value)"
            @blur="() => handleNativeInputBlur('nativeBirthDate')"
            required
            style="
              width: 100%;
              padding: 8px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 14px;
            "
          />
          <small style="color: #6c757d">Select your birth date (required)</small>
          <div
            v-if="nativeFormErrors.nativeBirthDate && touched.nativeBirthDate"
            style="color: #dc3545; margin-top: 5px; font-size: 12px"
          >
            {{ nativeFormErrors.nativeBirthDate }}
          </div>
        </div>

        <div style="margin-bottom: 20px">
          <label
            for="nativeStartDate"
            style="display: block; margin-bottom: 5px; font-weight: bold"
          >
            Start Date
          </label>
          <input
            type="date"
            id="nativeStartDate"
            name="nativeStartDate"
            :value="nativeFormData.nativeStartDate"
            @input="(e) => handleNativeInputChange('nativeStartDate', (e.target as HTMLInputElement).value)"
            @blur="() => handleNativeInputBlur('nativeStartDate')"
            style="
              width: 100%;
              padding: 8px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 14px;
            "
          />
          <small style="color: #6c757d">Project start date (optional)</small>
        </div>

        <div style="margin-bottom: 20px">
          <label
            for="nativeEndDate"
            style="display: block; margin-bottom: 5px; font-weight: bold"
          >
            End Date *
          </label>
          <input
            type="date"
            id="nativeEndDate"
            name="nativeEndDate"
            :value="nativeFormData.nativeEndDate"
            @input="(e) => handleNativeInputChange('nativeEndDate', (e.target as HTMLInputElement).value)"
            @blur="() => handleNativeInputBlur('nativeEndDate')"
            required
            style="
              width: 100%;
              padding: 8px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 14px;
            "
          />
          <small style="color: #6c757d">Project end date (required)</small>
          <div
            v-if="nativeFormErrors.nativeEndDate && touched.nativeEndDate"
            style="color: #dc3545; margin-top: 5px; font-size: 12px"
          >
            {{ nativeFormErrors.nativeEndDate }}
          </div>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 20px">
          <button
            type="submit"
            style="
              padding: 8px 16px;
              background: #007bff;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Submit Native
          </button>

          <button
            type="reset"
            @click="handleNativeReset"
            style="
              padding: 8px 16px;
              background: #6c757d;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Reset Native Form
          </button>

          <button
            type="button"
            @click="handleNativeClear"
            style="
              padding: 8px 16px;
              background: #dc3545;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Clear Native All
          </button>
        </div>

        <div
          style="
            margin-top: 20px;
            padding: 10px;
            background: #e3f2fd;
            border-radius: 4px;
          "
        >
          <strong>Native Form Status:</strong>
          <div>Valid: {{ isNativeFormValid }}</div>
          <div>Touched: {{ isNativeFormTouched }}</div>
          <div>Dirty: {{ isNativeFormDirty }}</div>
          <div style="margin-top: 10px">
            <strong>Native Form Values:</strong>
            <pre>{{ JSON.stringify(nativeFormData, null, 2) }}</pre>
          </div>
        </div>
      </form>
    </div>

    <!-- Form with novalidate default -->
    <div style="margin-bottom: 30px">
      <h3>2. Form with Vue Default (No HTML5 Validation)</h3>
      <form
        @submit="handleSubmitDefault"
        style="border: 1px solid #ccc; padding: 15px; border-radius: 4px"
      >
        <div style="margin-bottom: 15px">
          <div style="margin-bottom: 5px">
            <strong>Required Date Input:</strong>
          </div>
          <IxDateInput
            name="date3"
            label="Required Date"
            placeholder="Enter date (YYYY/MM/DD)"
            required
          />
        </div>

        <div style="margin-bottom: 15px">
          <div style="margin-bottom: 5px">
            <strong>Date with Min/Max Range:</strong>
          </div>
          <IxDateInput
            name="date4"
            label="Date Range"
            placeholder="Date range 2023-2025"
            min-date="2023/01/01"
            max-date="2025/12/31"
            required
          />
        </div>

        <button
          type="submit"
          style="
            padding: 8px 16px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
          "
        >
          Submit Form (Vue Default)
        </button>
      </form>
      <p>
        <small>This form uses Vue's default behavior (novalidate is applied by default)</small>
      </p>
    </div>

    <!-- Form with explicit novalidate -->
    <div style="margin-bottom: 30px">
      <h3>3. Form with Explicit NoValidate</h3>
      <form
        novalidate
        @submit="handleSubmitExplicitNoValidate"
        style="border: 1px solid #ccc; padding: 15px; border-radius: 4px"
      >
        <div style="margin-bottom: 15px">
          <div style="margin-bottom: 5px">
            <strong>Required Date Input:</strong>
          </div>
          <IxDateInput
            name="date5"
            label="Required Date"
            placeholder="Enter date (YYYY/MM/DD)"
            required
          />
        </div>

        <div style="margin-bottom: 15px">
          <div style="margin-bottom: 5px">
            <strong>Date with Min/Max Range:</strong>
          </div>
          <IxDateInput
            name="date6"
            label="Date Range"
            placeholder="Date range 2023-2025"
            min-date="2023/01/01"
            max-date="2025/12/31"
            required
          />
        </div>

        <button
          type="submit"
          style="
            padding: 8px 16px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
          "
        >
          Submit Form (Explicit NoValidate)
        </button>
      </form>
      <p><small>This form has explicit novalidate attribute</small></p>
    </div>

    <!-- Individual date inputs for comparison -->
    <div style="margin-bottom: 30px">
      <h3>4. Individual Date Inputs (Outside Forms)</h3>

      <div style="margin-bottom: 15px">
        <div style="margin-bottom: 5px">
          <strong>Required Date Input:</strong>
        </div>
        <IxDateInput
          label="Required Date"
          placeholder="Required date input"
          required
        />
        <p><small>Should show validation when invalid or empty</small></p>
      </div>

      <div style="margin-bottom: 15px">
        <div style="margin-bottom: 5px">
          <strong>Date with Custom Format:</strong>
        </div>
        <IxDateInput
          label="Custom Format"
          format="MM/dd/yyyy"
          placeholder="MM/dd/yyyy format"
        />
        <p><small>Should validate format MM/dd/yyyy</small></p>
      </div>
    </div>

    <!-- Vue Clear Method Demonstration -->
    <div style="margin-bottom: 30px">
      <h3>5. Vue Clear Method Demonstration</h3>
      <p><strong>Issue:</strong> Vue v-model can interfere with proper validation state reset when clearing fields.</p>
      <p><strong>Solution:</strong> Use the component's <code>clear()</code> method for proper clear button simulation.</p>

      <div style="margin-bottom: 20px; padding: 15px; border: 2px solid #007bff; border-radius: 8px;">
        <div style="margin-bottom: 10px">
          <strong>Test Date Input (Required):</strong>
        </div>
        <IxDateInput
          ref="clearTestDateInputRef"
          v-model="clearTestValue"
          label="Clear Method Test"
          placeholder="Enter invalid date, then test clear methods"
          required
        />
        <p style="margin: 10px 0; font-size: 14px">
          Current value: <code>{{ clearTestValue || '(empty)' }}</code>
        </p>

        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px">
          <button
            type="button"
            @click="handleSetInvalidDate"
            style="
              padding: 8px 12px;
              background: #ff9800;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            1. Set Invalid Date
          </button>

          <button
            type="button"
            @click="handleVModelClear"
            style="
              padding: 8px 12px;
              background: #f44336;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            2. Clear via v-model
          </button>

          <button
            type="button"
            @click="handleClearMethodTest"
            style="
              padding: 8px 12px;
              background: #4caf50;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            3. Clear via clear() method
          </button>
        </div>

        <div style="margin-top: 15px; padding: 10px; background: #f0f8ff; border-radius: 4px; font-size: 14px">
          <strong>Instructions:</strong>
          <ol style="margin: 5px 0; padding-left: 20px">
            <li>Click "Set Invalid Date" to enter an invalid value</li>
            <li>Focus and blur the field to make it touched (validation should show)</li>
            <li>Try "Clear via v-model" - validation may persist (Vue issue)</li>
            <li>Try "Clear via clear() method" - validation should reset properly</li>
          </ol>
          <p style="margin: 5px 0">
            <strong>Expected:</strong> The clear() method should reset both value and touched state,
            making required fields valid when empty. V-model clearing may not reset touched state.
          </p>
        </div>
      </div>
    </div>    <!-- Testing instructions -->
    <div
      style="
        background: #f5f5f5;
        padding: 15px;
        border-radius: 4px;
        margin-top: 30px;
      "
    >
      <h3>Testing Instructions:</h3>
      <ol>
        <li>
          <strong>Invalid Date Test:</strong> Enter "invalid" or "99/99/9999" in each field
        </li>
        <li>
          <strong>Empty Required Test:</strong> Leave required fields empty and try to submit
        </li>
        <li>
          <strong>Range Test:</strong> Enter dates outside min/max range (e.g., "2020/01/01")
        </li>
        <li>
          <strong>Clear Button Test:</strong>
          <ul>
            <li>Enter invalid date in required field</li>
            <li>Focus and blur the field (makes it touched)</li>
            <li>Use the clear button or programmatically set value to empty</li>
            <li>Field should become valid again (touched state reset)</li>
          </ul>
        </li>
        <li>
          <strong>Form Submission:</strong>
          <ul>
            <li>Form #1 (HTML5 validation enabled): Should prevent submission and show browser validation errors</li>
            <li>Form #2 (Vue default): Should allow submission (no HTML5 validation)</li>
            <li>Form #3 (Explicit novalidate): Should allow submission (no HTML5 validation)</li>
          </ul>
        </li>
        <li>
          <strong>Console Logging:</strong> Open browser DevTools console to see detailed form submission logs
        </li>
      </ol>
      <p><strong>Expected Behavior in Vue:</strong></p>
      <ul>
        <li><strong>Form #1</strong> - :novalidate="false": Browser validation enabled, will show HTML5 validation errors</li>
        <li><strong>Form #2</strong> - Default Vue form: Browser validation disabled (Vue applies novalidate by default)</li>
        <li><strong>Form #3</strong> - novalidate: Explicitly disabled browser validation (same as #2)</li>
        <li><strong>Individual inputs</strong>: ix-date-input component validation works regardless of form context</li>
      </ul>
      <p><strong>Console Output:</strong> Each form submission will log:</p>
      <ul>
        <li>Form identification and validation mode</li>
        <li>All form field names and values</li>
        <li>HTML5 validation status (for Form #1)</li>
        <li>Clear visual separation between different form submissions</li>
      </ul>
      <p>
        <strong>Key Vue Insight:</strong> Vue disables HTML5 validation by default.
        To enable it, use :novalidate="false" explicitly.
      </p>
    </div>
  </div>
</template>

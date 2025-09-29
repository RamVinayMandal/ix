<!--
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
-->

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { IxRadio, IxRadioGroup } from '@siemens/ix-vue';

const selectedStorage = ref('');
const touched = ref(false);
const error = ref('');

// Add watcher to debug value changes
watch(
  selectedStorage,
  (newVal, oldVal) => {
    console.log('=== VUE SELECTEDSTORAGE WATCHER ===');
    console.log('Old value:', oldVal);
    console.log('New value:', newVal);
    console.log('Type of new value:', typeof newVal);
    console.log('===================================');
  },
  { immediate: true }
);

const selectedStorage2 = ref('');
const touched2 = ref(false);
const error2 = ref('');

function validateSelection() {
  if (touched.value && !selectedStorage.value) {
    error.value = 'Please select a storage option';
  } else {
    error.value = '';
  }
}

function validateSelection2() {
  if (touched2.value && !selectedStorage2.value) {
    error2.value = 'Please select a storage option';
  } else {
    error2.value = '';
  }
}

function submitForm() {
  touched.value = true;
  validateSelection();
  if (!error.value) {
    alert('Form submitted: ' + selectedStorage.value);
  }
}

function submitForm2() {
  touched2.value = true;
  validateSelection2();
  if (!error2.value) {
    alert('Form 2 submitted: ' + selectedStorage2.value);
  }
}

function resetForm() {
  console.log('=== VUE FORM RESET ===');
  console.log('Before reset - selectedStorage.value:', selectedStorage.value);
  console.log('Before reset - type:', typeof selectedStorage.value);

  // Check the actual DOM element
  const radioGroup = radioGroupRef.value as any;
  if (radioGroup) {
    console.log('RadioGroup DOM element value before:', radioGroup.value);
  }

  selectedStorage.value = null as any; // Try null instead of empty string

  // Check again after Vue update
  setTimeout(() => {
    if (radioGroup) {
      console.log('RadioGroup DOM element value after:', radioGroup.value);
    }
  }, 10);

  console.log('After reset - selectedStorage.value:', selectedStorage.value);
  console.log('After reset - type:', typeof selectedStorage.value);
  touched.value = false;
  error.value = '';
  console.log('Reset completed');
  console.log('====================');
}

function resetForm2() {
  console.log('=== VUE FORM 2 RESET ===');
  console.log('Before reset - selectedStorage2.value:', selectedStorage2.value);
  selectedStorage2.value = '';
  touched2.value = false;
  error2.value = '';
  console.log('Reset completed');
  console.log('======================');
}

function handleFormReset() {
  console.log('=== NATIVE FORM RESET EVENT ===');
  // Native form reset event - let's try to respond to this
  setTimeout(() => {
    console.log('Handling native reset - clearing Vue state');
    selectedStorage.value = '';
    touched.value = false;
    error.value = '';
  }, 0);
  console.log('===============================');
}

function handleFormReset2() {
  console.log('=== NATIVE FORM 2 RESET EVENT ===');
  setTimeout(() => {
    console.log('Handling native reset 2 - clearing Vue state');
    selectedStorage2.value = '';
    touched2.value = false;
    error2.value = '';
  }, 0);
  console.log('=================================');
}

function clearTouchedState() {
  touched.value = false;
  error.value = '';
}

const nativeForm = ref(null);
const vueForm = ref(null);
const vueForm2 = ref(null);
const radioGroupRef = ref(null);

function submitNativeForm() {
  const form = nativeForm.value as HTMLFormElement;
  const formData = new FormData(form);
  const selectedValue = formData.get('nativeStorage');

  if (selectedValue) {
    alert('Native form submitted: ' + selectedValue);
  } else {
    alert('Please select a storage option');
  }

  updateNativeDisplay();
}

function resetNativeForm() {
  console.log('=== NATIVE JS FORM RESET ===');
  const form = nativeForm.value as HTMLFormElement;
  if (form) {
    form.reset();
    console.log('Native form reset called via JS');
    updateNativeDisplay();
  }
  console.log('============================');
}

function updateNativeDisplay() {
  setTimeout(() => {
    const form = nativeForm.value as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
      const selectedValue = formData.get('nativeStorage') || 'None';
      const displayElement = document.getElementById('nativeValue');
      if (displayElement) {
        displayElement.textContent = selectedValue.toString();
      }
    }
  }, 10);
}

// Add event listeners for native radio buttons to update display
function setupNativeListeners() {
  setTimeout(() => {
    const form = nativeForm.value as HTMLFormElement;
    if (form) {
      const radios = form.querySelectorAll('input[name="nativeStorage"]');
      radios.forEach((radio) => {
        radio.addEventListener('change', updateNativeDisplay);
      });
      updateNativeDisplay(); // Initial update
    }
  }, 100);
}

// Setup listeners when component mounts
onMounted(() => {
  setupNativeListeners();
});
</script>

<template>
  <div style="padding: 20px; max-width: 600px; height: 500px; overflow: scroll">
    <h2>Radio Group - Form Reset Testing</h2>
    <form
      @submit.prevent="submitForm"
      style="
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 4px;
        margin-bottom: 20px;
      "
    >
      <h3>Storage Configuration Form</h3>
      <IxRadioGroup
        ref="radioGroupRef"
        label="Storage options"
        :value="selectedStorage"
        @value-change="
          console.log('=== VUE @value-change EVENT ===', $event.detail);
          selectedStorage = $event.detail;
          touched = true;
          validateSelection();
        "
        :class="{ 'ix-invalid': touched && !selectedStorage }"
        style="margin-bottom: 15px"
      >
        <IxRadio
          label="256GB SSD storage"
          value="256"
          name="selectedStorage"
          required
        />
        <IxRadio label="512GB SSD storage" value="512" name="selectedStorage" />
        <IxRadio label="1TB SSD storage" value="1024" name="selectedStorage" />
        <IxRadio
          label="2TB SSD storage"
          value="2048"
          name="selectedStorage"
          disabled
        />
      </IxRadioGroup>
      <div v-if="touched && error" style="color: red; margin-top: 8px">
        {{ error }}
      </div>
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
          Submit Order
        </button>
        <button
          type="button"
          @click="resetForm"
          style="
            padding: 8px 16px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 4px;
            margin-right: 10px;
          "
        >
          Reset Form
        </button>
        <button
          type="button"
          @click="clearTouchedState"
          style="
            padding: 8px 16px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
          "
        >
          Clear Touched State
        </button>
      </div>
      <div style="margin-top: 15px">
        <div>
          <strong>Current Value:</strong> {{ selectedStorage || 'None' }}
        </div>
        <div><strong>Touched:</strong> {{ touched }}</div>
      </div>
    </form>
    <!-- Standalone Radio Group (for comparison) -->
    <div
      style="
        border: 1px solid #ccc;
        padding: 15px;
        color: #333;
        border-radius: 4px;
        margin-bottom: 20px;
      "
    >
      <h3>Standalone Radio Group (No Form)</h3>
      <IxRadioGroup label="Storage options">
        <IxRadio
          label="256GB SSD storage"
          value="256"
          name="storage-standalone"
        />
        <IxRadio
          label="512GB SSD storage"
          value="512"
          name="storage-standalone"
        />
        <IxRadio
          label="1TB SSD storage"
          value="1024"
          name="storage-standalone"
        />
        <IxRadio
          label="2TB SSD storage"
          value="2048"
          name="storage-standalone"
          disabled
        />
      </IxRadioGroup>
    </div>

    <!-- Native HTML Radio Group (for comparison) -->
    <div style="border: 1px solid red; padding: 15px; border-radius: 4px">
      <h3>Native HTML Radio Group</h3>
      <form
        ref="nativeForm"
        @submit.prevent="submitNativeForm"
        style="
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 4px;
          background: #f9f9f9;
        "
      >
        <fieldset
          style="
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
          "
        >
          <legend>Storage Options (Native HTML)</legend>
          <div style="margin-bottom: 8px">
            <input
              type="radio"
              id="native-256"
              name="nativeStorage"
              value="256"
              required
            />
            <label for="native-256" style="margin-left: 8px"
              >256GB SSD storage</label
            >
          </div>
          <div style="margin-bottom: 8px">
            <input
              type="radio"
              id="native-512"
              name="nativeStorage"
              value="512"
            />
            <label for="native-512" style="margin-left: 8px"
              >512GB SSD storage</label
            >
          </div>
          <div style="margin-bottom: 8px">
            <input
              type="radio"
              id="native-1024"
              name="nativeStorage"
              value="1024"
            />
            <label for="native-1024" style="margin-left: 8px"
              >1TB SSD storage</label
            >
          </div>
          <div style="margin-bottom: 8px">
            <input
              type="radio"
              id="native-2048"
              name="nativeStorage"
              value="2048"
              disabled
            />
            <label for="native-2048" style="margin-left: 8px"
              >2TB SSD storage (Disabled)</label
            >
          </div>
        </fieldset>

        <div style="margin-top: 15px">
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
            Submit Native Form
          </button>
          <button
            type="reset"
            style="
              padding: 8px 16px;
              background: #dc3545;
              color: white;
              border: none;
              border-radius: 4px;
              margin-right: 10px;
            "
          >
            Reset Native Form
          </button>
          <button
            type="button"
            @click="resetNativeForm"
            style="
              padding: 8px 16px;
              background: #6c757d;
              color: white;
              border: none;
              border-radius: 4px;
            "
          >
            JS Reset Native Form
          </button>
        </div>

        <div style="margin-top: 15px; font-size: 14px">
          <div>
            <strong>Selected Native Value:</strong>
            <span id="nativeValue">None</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

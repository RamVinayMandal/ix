<!--
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
-->
<script setup lang="ts">
import { ref } from 'vue';
import { IxDateInput } from '@siemens/ix-vue';

const dateRequired = ref('');
const dateWithMinMax = ref('');
const dateWithFormat = ref('');
const dateDisabled = ref('');
const dateReadonly = ref('2024/09/10');
const dateInvalid = ref('invalid');
const dateValid = ref('2024/09/10');

const onSubmit = (event: Event) => {
  const form = event.target as HTMLFormElement;
  if (!form.checkValidity()) {
    event.preventDefault();
    alert('Form is invalid!');
    return;
  }
  alert('Form submitted!');
};
</script>

<template>
  <div style="height: 700px; overflow: scroll; padding: 20px; max-width: 600px; margin: 40px auto;">
    <form @submit="onSubmit" style="display: flex; flex-direction: column; gap: 2rem;">
      <h2>IxDateInput Form Examples</h2>
      <!-- Required date input -->
      <IxDateInput
        v-model="dateRequired"
        name="dateRequired"
        label="Required Date"
        required
        placeholder="Enter a date"
      i18n-error-date-unparsable="Please enter a valid date"
      />

      <!-- Date input with min/max -->
      <IxDateInput
        v-model="dateWithMinMax"
        name="dateWithMinMax"
        label="Date with Min/Max"
        required
        min-date="2024/09/01"
        max-date="2024/09/30"
        placeholder="Pick a date in September 2024"
        i18n-error-date-unparsable="Date must be in September 2024"
      />

      <!-- Date input with custom format -->
      <IxDateInput
        v-model="dateWithFormat"
        name="dateWithFormat"
        label="Custom Format (MM/dd/yyyy)"
        format="MM/dd/yyyy"
        required
        placeholder="MM/dd/yyyy"
        i18n-error-date-unparsable="Format must be MM/dd/yyyy"
      />

      <!-- Disabled date input -->
      <IxDateInput
        v-model="dateDisabled"
        name="dateDisabled"
        label="Disabled Date Input"
        disabled
        placeholder="Disabled"
      />

      <!-- Readonly date input -->
      <IxDateInput
        v-model="dateReadonly"
        name="dateReadonly"
        label="Readonly Date Input"
        readonly
        placeholder="Readonly"
      />

      <!-- Invalid date input (shows error) -->
      <IxDateInput
        v-model="dateInvalid"
        name="dateInvalid"
        label="Invalid Date Input"
        required
       valid-text="This date is valid!"
      />

      <!-- Valid date input (shows valid state) -->
      <IxDateInput
        v-model="dateValid"
        name="dateValid"
        label="Valid Date Input"
        required
        valid-text="This date is valid!"
      />

      <button type="submit" style="margin-top: 16px;">Submit Form</button>
    </form>
  </div>
</template>

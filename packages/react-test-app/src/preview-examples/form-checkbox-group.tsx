/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React, { useState } from 'react';
import { IxCheckbox, IxCheckboxGroup } from '@siemens/ix-react';

const initialFormState = {
  agreed: false,
  most: false,
};

const initialTouched = {
  agreed: false,
  most: false,
};

export default function CheckboxGroupExample() {
  const [form, setForm] = useState(initialFormState);
  const [touched, setTouched] = useState(initialTouched);

  const isValid = form.agreed || form.most;

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setForm((prev) => ({ ...prev, [name]: checked }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ agreed: true, most: true });
    console.log('=== CHECKBOX GROUP FORM SUBMISSION ===');
    console.log('Form submitted with values:', form);
    console.log('Form Valid (at least one):', isValid);
    console.log('Form Touched:', touched);
    console.log('====================================');
  };

  // Angular-like reset function - resets both values and touched state
  const resetForm = () => {
    console.log('=== FORM RESET (Angular-like) ===');
    console.log('Before reset - Values:', form);
    console.log('Before reset - Touched:', touched);

    // Reset both form and touched to completely clean state
    setForm(initialFormState);
    setTouched(initialTouched);

    console.log('After reset - Values:', initialFormState);
    console.log('After reset - Touched:', initialTouched);
    console.log('=================================');
  };

  const clearTouchedOnly = () => {
    console.log('=== CLEAR TOUCHED STATE ONLY ===');
    console.log('Values preserved:', form);
    console.log('Touched before:', touched);

    // Only clear touched state, keep values
    setTouched(initialTouched);

    console.log('Touched after:', initialTouched);
    console.log('================================');
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, height: 400, overflow: 'scroll' }}>
      <h2>Checkbox Group - Form Reset Testing</h2>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 4, marginBottom: 20 }}>
        <h3>Terms Agreement Form</h3>
        <IxCheckboxGroup label="Terms of something" invalidText="Please select at least one option">
          <IxCheckbox
            label="I agree everything"
            name="agreed"
            checked={form.agreed}

            onCheckedChange={(e: CustomEvent<boolean>) => handleCheckboxChange('agreed', e.detail)}
          />
          <IxCheckbox
            label="I agree with most of it"
            name="most"
            checked={form.most}
            onCheckedChange={(e: CustomEvent<boolean>) => handleCheckboxChange('most', e.detail)}
          />
        </IxCheckboxGroup>
        {!isValid && (touched.agreed || touched.most) && (
          <div style={{ color: 'red', marginTop: 10 }}>
            Please select at least one option.
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: 4, marginRight: 10 }}>
            Submit
          </button>
          <button type="button" onClick={resetForm} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: 4, marginRight: 10 }}>
            Reset
          </button>
          <button type="button" onClick={clearTouchedOnly} style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: 4 }}>
            Clear Touched State
          </button>
        </div>
        <div style={{ marginTop: 15 }}>
          <div><strong>Current Values:</strong></div>
          <div>I agree everything: {form.agreed ? 'Checked' : 'Unchecked'}</div>
          <div>I agree with most of it: {form.most ? 'Checked' : 'Unchecked'}</div>
          <div>Form Valid (at least one): {isValid ? 'true' : 'false'}</div>
          <div>Form Touched: {Object.values(touched).some(Boolean) ? 'true' : 'false'}</div>
        </div>
      </form>
    </div>
  );
}

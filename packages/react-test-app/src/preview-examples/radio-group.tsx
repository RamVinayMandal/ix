/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React, { useState } from 'react';
import { IxRadio, IxRadioGroup } from '@siemens/ix-react';

const initialFormState = {
  selectedStorage: '',
  // customerName: '',
  // email: '',
};

const initialTouched = {
  selectedStorage: false,
  // customerName: false,
  // email: false,
};

export default function RadioGroupExample() {
  const [form, setForm] = useState(initialFormState);
  const [touched, setTouched] = useState(initialTouched);

  // Native radio group for comparison
  const [nativeValue, setNativeValue] = useState('256');
  const [nativeTouched, setNativeTouched] = useState(false);

  const isValid = form.selectedStorage;

  const handleRadioChange = (event: CustomEvent<string>) => {
    const value = event.detail;
    setForm((prev) => ({ ...prev, selectedStorage: value }));
    setTouched((prev) => ({ ...prev, selectedStorage: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ selectedStorage: true });

    console.log('====================================');
  };

  const handleReset = () => {
    console.log('=== FORM RESET ===');
    console.log('Before reset:', form);
    // Reset like Angular: reset to initial values
    setForm(initialFormState);
    setTouched(initialTouched);
    console.log('After reset:', initialFormState);
    console.log('==================');
  };

  const handleClearTouched = () => {
    setTouched(initialTouched);
    console.log('=== CLEAR TOUCHED STATE ===');
    console.log('All controls marked as untouched.');
    console.log('Values preserved:', form);
    console.log('============================');
  };

  // Native radio group handlers
  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNativeValue(e.target.value);
    setNativeTouched(true);
  };
  const handleNativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNativeTouched(true);
    console.log('=== NATIVE RADIO GROUP FORM SUBMISSION ===');
    console.log('Form submitted with values:');
    console.log('Selected Storage:', nativeValue);
    console.log('Form Valid:', !!nativeValue);
    console.log('Form Touched:', nativeTouched);
  };
  const handleNativeReset = () => {
    setNativeValue('256');
    setNativeTouched(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, height: 700, overflow: 'scroll' }}>
      <h2>Radio Group - Form Reset Testing</h2>
      {/* Form with validation and reset */}
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 4, marginBottom: 20 }}>
        <h3>Storage Configuration Form</h3>
        <IxRadioGroup label="Storage options" value={form.selectedStorage} onValueChange={handleRadioChange} style={{ marginBottom: 15 }}>
          <IxRadio label="256GB SSD storage" value="256" name="selectedStorage" />
          <IxRadio label="512GB SSD storage" value="512" name="selectedStorage" />
          <IxRadio label="1TB SSD storage" value="1024" name="selectedStorage" />
          <IxRadio label="2TB SSD storage" value="2048" name="selectedStorage" />
        </IxRadioGroup>

        <div style={{ marginTop: 20 }}>
          <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: 4, marginRight: 10 }}>
            Submit Order
          </button>
          <button type="button" onClick={handleReset} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: 4, marginRight: 10 }}>
            Reset Form
          </button>
          <button type="button" onClick={handleClearTouched} style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: 4 }}>
            Clear Touched State
          </button>
        </div>
        <div style={{ marginTop: 15 }}>
          <div><strong>Current Values:</strong></div>
          <div>Selected Storage: {form.selectedStorage || 'None'}</div>
          <div>Customer Name: {/* form.customerName || */ 'Empty'}</div>
          <div>Email: {/* form.email || */ 'Empty'}</div>
          <div>Form Valid: {isValid ? 'true' : 'false'}</div>
          <div>Form Touched: {Object.values(touched).some(Boolean) ? 'true' : 'false'}</div>
        </div>
      </form>

      {/* Standalone Radio Group (for comparison) */}
      <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 4 }}>
        <h3>Standalone Radio Group (No Form)</h3>
        <IxRadioGroup label="Storage options">
          <IxRadio label="256GB SSD storage" value="256" name="storage-standalone" />
          <IxRadio label="512GB SSD storage" value="512" name="storage-standalone" />
          <IxRadio label="1TB SSD storage" value="1024" name="storage-standalone" />
          <IxRadio label="2TB SSD storage" value="2048" name="storage-standalone" disabled />
        </IxRadioGroup>
      </div>

      {/* Native Radio Group Form (for comparison) */}
      <form onSubmit={handleNativeSubmit} style={{ border: '1px solid #28a745', padding: 15, borderRadius: 4, margin: '20px 0' }}>
        <h3>Native Radio Group (Angular Reactive Form)</h3>
        <div style={{ marginBottom: 15 }}>
          <label><input type="radio" name="nativeStorage" value="256" checked={nativeValue === '256'} onChange={handleNativeChange} required /> 256GB SSD storage</label><br />
          <label><input type="radio" name="nativeStorage" value="512" checked={nativeValue === '512'} onChange={handleNativeChange} required /> 512GB SSD storage</label><br />
          <label><input type="radio" name="nativeStorage" value="1024" checked={nativeValue === '1024'} onChange={handleNativeChange} required /> 1TB SSD storage</label><br />
          <label><input type="radio" name="nativeStorage" value="2048" checked={nativeValue === '2048'} onChange={handleNativeChange} required /> 2TB SSD storage</label>
        </div>
        <div style={{ marginTop: 20 }}>
          <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: 4, marginRight: 10 }}>
            Submit Native Form
          </button>
          <button type="button" onClick={handleNativeReset} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: 4 }}>
            Reset Native Form
          </button>
        </div>
        <div style={{ marginTop: 15 }}>
          <div><strong>Current Native Value:</strong></div>
          <div>Selected Storage: {nativeValue || 'None'}</div>
          <div>Form Valid: {nativeValue ? 'true' : 'false'}</div>
          <div>Form Touched: {nativeTouched ? 'true' : 'false'}</div>
        </div>
      </form>

      {/* Testing instructions */}
      <div style={{ background: '#f5f5f5', padding: 15, borderRadius: 4, marginTop: 20 }}>
        <h3>Testing Instructions:</h3>
        <ol>
          <li><strong>Form Interaction:</strong> Select a storage option and fill in the customer name</li>
          <li><strong>Submit Test:</strong> Try submitting without selecting storage or entering name</li>
          <li><strong>Reset Form:</strong> Click "Reset Form" to clear all values and validation states</li>
          <li><strong>Clear Touched State:</strong> Click "Clear Touched State" to reset only the touched state without clearing values</li>
          <li><strong>Console Logging:</strong> Open browser DevTools console to see detailed form submission logs</li>
        </ol>
        <p><strong>Expected Behavior:</strong></p>
        <ul>
          <li><strong>Reset Form:</strong> Clears all values, resets touched state, and removes validation errors</li>
          <li><strong>Clear Touched State:</strong> Keeps values but resets the touched state (simulates programmatic reset)</li>
          <li><strong>Form Validation:</strong> Shows validation errors only after user interaction</li>
        </ul>
      </div>
    </div>
  );
}

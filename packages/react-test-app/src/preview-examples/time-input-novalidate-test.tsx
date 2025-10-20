/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxTimeInput } from '@siemens/ix-react';
import React, { useState } from 'react';

export default function TimeInputNoValidateTest() {
  const [timeValue1, setTimeValue1] = useState(''); // Empty to test required validation
  const [timeValue2, setTimeValue2] = useState(''); // Empty optional field
  const [timeValue3, setTimeValue3] = useState(''); // Empty to test internal validation
  const [formMessage, setFormMessage] = useState('');

  const handleSubmitWithValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    console.log('=== FORM 1: HTML5 Validation Enabled ===');
    console.log('Form submitted with HTML5 validation enabled');

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:');
    Object.entries(data).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // HTML5 validation check
    if (form.checkValidity()) {
      console.log('✅ Form is valid according to HTML5 validation');
      setFormMessage('✅ Form submitted successfully! HTML5 validation passed.');
    } else {
      console.log('❌ Form is invalid according to HTML5 validation');
      setFormMessage('❌ Form validation failed. Please check the fields.');
      // Trigger HTML5 validation display
      form.reportValidity();
    }
    console.log('==========================================');
  };

  const handleSubmitWithoutValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    console.log('=== FORM 2: Internal Validation (noValidate) ===');
    console.log('Form submitted with noValidate (HTML5 validation bypassed)');

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:');
    Object.entries(data).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // Manual validation check could be added here
    console.log('✅ Form submitted with internal validation handling');
    setFormMessage('✅ Form submitted with internal validation! Check the logs.');
    console.log('==========================================');
  };

  const handleReset = () => {
    console.log('=== TIME FORM RESET ===');
    setTimeValue1('');
    setTimeValue2('');
    setTimeValue3('');
    setFormMessage('');
    console.log('Time form has been reset');
  };

  const handleClear = () => {
    console.log('=== CLEAR ALL TIME FIELDS ===');
    setTimeValue1('');
    setTimeValue2('');
    setTimeValue3('');
    setFormMessage('');
    console.log('All time fields cleared');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', height: '700px', overflow: 'auto' }}>
      <h1>React Time Input - NoValidate Test</h1>

      {/* Form 1: HTML5 Validation Enabled */}
      <div style={{ marginBottom: '30px' }}>
        <h2>1. Form with HTML5 Validation Enabled</h2>
        <form
          onSubmit={handleSubmitWithValidation}
          style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px' }}
          noValidate={false} // Enable HTML5 validation
        >
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Required Time Field:</strong>
            </div>
            <IxTimeInput
              name="time1"
              label="Required Time"
              placeholder="Enter time (HH:mm)"
              required
              value={timeValue1}
              onValueChange={(e) => setTimeValue1(e.detail)}
            />

            <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
              Expected: Native HTML5 validation tooltip on submit, no red borders
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Optional Time Field:</strong>
            </div>
            <IxTimeInput
              name="time2"
              label="Optional Time"
              placeholder="Enter time (HH:mm)"
              value={timeValue2}
              onValueChange={(e) => setTimeValue2(e.detail)}
            />
          </div>

          <button type="submit" style={{ marginTop: '10px' }}>
            Submit Form (HTML5 Validation)
          </button>
        </form>

        {formMessage && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#f0f8ff', border: '1px solid #007acc', borderRadius: '4px' }}>
            {formMessage}
          </div>
        )}

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Test:</strong> Click submit without filling required field. Should show native browser validation tooltip.
        </p>
      </div>

      {/* Form 2: Internal Validation (noValidate) */}
      <div style={{ marginBottom: '30px' }}>
        <h2>2. Form with Internal Validation (noValidate={`{true}`})</h2>
        <form
          noValidate={true} // Disable HTML5 validation
          onSubmit={handleSubmitWithoutValidation}
          style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px' }}
        >
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Required Time Field:</strong>
            </div>
            <IxTimeInput
              name="time3"
              label="Required Time"
              placeholder="Enter time (HH:mm)"
              required
              value={timeValue3}
              onValueChange={(e) => setTimeValue3(e.detail)}
            />

            <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
              Expected: Internal validation (red borders) on submit and interaction
            </div>
          </div>

          <button type="submit" style={{ marginTop: '10px' }}>
            Submit Form (Internal Validation)
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Test:</strong> Click submit without filling required field. Should show red borders and validation styling.
        </p>

        {/* Reset and Clear Buttons */}
        <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Form Controls</h3>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: '8px 16px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset All Forms
            </button>
            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: '8px 16px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear All Fields
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            <strong>Reset:</strong> Resets all forms and clears validation states<br />
            <strong>Clear:</strong> Clears all field values but maintains form state
          </p>
        </div>
      </div>

      {/* Native HTML Time Input Comparison */}
      <div style={{ marginBottom: '30px' }}>
        <h2>3. Native HTML Time Input (for comparison)</h2>
        <form
          onSubmit={(e) => { e.preventDefault(); console.log('Native form submitted'); }}
          style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px' }}
        >
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="nativeTime" style={{ display: 'block', marginBottom: '5px' }}>
              <strong>Native Time Input:</strong>
            </label>
            <input
              id="nativeTime"
              name="nativeTime"
              type="time"
              required
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />

            <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
              Reference: Native browser validation behavior
            </div>
          </div>

          <button type="submit" style={{ marginTop: '10px' }}>
            Submit Native Form
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Reference:</strong> This shows how native time input behaves with HTML5 validation.
        </p>
      </div>

      {/* Debug Information */}
      <div style={{ marginTop: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Debug Information</h3>
        <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
          <div>Form 1 Value: {timeValue1 || 'empty'}</div>
          <div>Form 2 Value: {timeValue3 || 'empty'}</div>
          <div>Optional Field Value: {timeValue2 || 'empty'}</div>
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Open browser console to see detailed form submission logs.
        </p>
      </div>
    </div>
  );
}

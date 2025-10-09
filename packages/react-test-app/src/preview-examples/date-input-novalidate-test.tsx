/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import { IxDateInput } from '@siemens/ix-react';

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

export default function DateInputTest() {
  const [nativeFormData, setNativeFormData] = useState<FormData>({
    nativeBirthDate: '',
    nativeStartDate: '',
    nativeEndDate: ''
  });

  const [nativeFormErrors, setNativeFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const nativeFormRef = useRef<HTMLFormElement>(null);

  // Helper function to validate native form
  const validateNativeForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!nativeFormData.nativeBirthDate.trim()) {
      errors.nativeBirthDate = 'Birth date is required';
    }

    if (!nativeFormData.nativeEndDate.trim()) {
      errors.nativeEndDate = 'End date is required';
    }

    return errors;
  };

  // Handle form submissions
  const handleSubmitWithValidation = (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleSubmitDefault = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('=== FORM 2: React Default (No HTML5 Validation) ===');
    console.log('Form submitted with React default behavior (novalidate)');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log('Form data:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    console.log('Note: HTML5 validation is disabled by React default');
    console.log('====================================================');
  };

  const handleSubmitExplicitNoValidate = (event: React.FormEvent<HTMLFormElement>) => {
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
  const handleNativeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateNativeForm();
    setNativeFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('=== NATIVE FORM SUBMISSION ===');
      console.log('Native Form Values:', nativeFormData);
      alert('Native form submitted successfully!\nCheck console for details.');
    } else {
      console.log('=== NATIVE FORM VALIDATION FAILED ===');
      console.log('Native Form Errors:', errors);
      // Mark all fields as touched to show errors
      setTouched({
        nativeBirthDate: true,
        nativeStartDate: true,
        nativeEndDate: true
      });
    }
  };

  const handleNativeReset = () => {
    console.log('=== NATIVE FORM RESET ===');
    setNativeFormData({
      nativeBirthDate: '',
      nativeStartDate: '',
      nativeEndDate: ''
    });
    setNativeFormErrors({});
    setTouched({});

    // Also trigger browser's native form reset
    if (nativeFormRef.current) {
      nativeFormRef.current.reset();
    }
    console.log('Native form has been reset');
  };

  const handleNativeClear = () => {
    console.log('=== CLEAR ALL NATIVE FIELDS ===');
    setNativeFormData({
      nativeBirthDate: '',
      nativeStartDate: '',
      nativeEndDate: ''
    });
    console.log('All native fields cleared');
  };

  // Handle input changes for native form
  const handleNativeInputChange = (field: keyof FormData, value: string) => {
    setNativeFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (nativeFormErrors[field]) {
      setNativeFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNativeInputBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isNativeFormValid = Object.keys(validateNativeForm()).length === 0;
  const isNativeFormTouched = Object.values(touched).some(Boolean);
  const isNativeFormDirty = Object.values(nativeFormData).some(value => value.trim() !== '');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', height: '700px', overflow: 'scroll' }}>
      <h2>Date Input - NoValidate Testing (React)</h2>

      {/* Form with validation (default) */}
      <div style={{ marginBottom: '30px' }}>
        <h3>1. Form with HTML5 Validation Enabled</h3>
        <form
          onSubmit={handleSubmitWithValidation}
          style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px' }}
          noValidate={false} // Enable HTML5 validation
        >
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Required Date Input:</strong>
            </div>
            <IxDateInput
              name="date1"
              label="Required Date"
              placeholder="Enter date (YYYY/MM/DD)"
              required
            />

            <div style={{ marginTop: '10px' }}>
              <IxDateInput
                name="date1b"
                label="Optional Date"
                placeholder="Enter date (YYYY/MM/DD)"
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Date with Min/Max Range:</strong>
            </div>
            <IxDateInput
              name="date2"
              label="Date Range"
              placeholder="Date range 2023-2025"
              minDate="2023/01/01"
              maxDate="2025/12/31"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '8px 16px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Submit Form
          </button>
        </form>
        <p>
          <small>This form has noValidate={false} to enable HTML5 validation</small>
        </p>
      </div>

      {/* Native HTML Date Form */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Native HTML Date Form (for comparison)</h3>

        <form
          ref={nativeFormRef}
          onSubmit={handleNativeSubmit}
          noValidate={false} // Enable HTML5 validation
          style={{
            border: '1px solid #007bff',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px'
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="nativeBirthDate"
              style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
            >
              Birth Date *
            </label>
            <input
              type="date"
              id="nativeBirthDate"
              name="nativeBirthDate"
              value={nativeFormData.nativeBirthDate}
              onChange={(e) => handleNativeInputChange('nativeBirthDate', e.target.value)}
              onBlur={() => handleNativeInputBlur('nativeBirthDate')}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <small style={{ color: '#6c757d' }}>Select your birth date (required)</small>
            {nativeFormErrors.nativeBirthDate && touched.nativeBirthDate && (
              <div style={{ color: '#dc3545', marginTop: '5px', fontSize: '12px' }}>
                {nativeFormErrors.nativeBirthDate}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="nativeStartDate"
              style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
            >
              Start Date
            </label>
            <input
              type="date"
              id="nativeStartDate"
              name="nativeStartDate"
              value={nativeFormData.nativeStartDate}
              onChange={(e) => handleNativeInputChange('nativeStartDate', e.target.value)}
              onBlur={() => handleNativeInputBlur('nativeStartDate')}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <small style={{ color: '#6c757d' }}>Project start date (optional)</small>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="nativeEndDate"
              style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
            >
              End Date *
            </label>
            <input
              type="date"
              id="nativeEndDate"
              name="nativeEndDate"
              value={nativeFormData.nativeEndDate}
              onChange={(e) => handleNativeInputChange('nativeEndDate', e.target.value)}
              onBlur={() => handleNativeInputBlur('nativeEndDate')}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <small style={{ color: '#6c757d' }}>Project end date (required)</small>
            {nativeFormErrors.nativeEndDate && touched.nativeEndDate && (
              <div style={{ color: '#dc3545', marginTop: '5px', fontSize: '12px' }}>
                {nativeFormErrors.nativeEndDate}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit Native
            </button>

            <button
              type="reset"
              onClick={handleNativeReset}
              style={{
                padding: '8px 16px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset Native Form
            </button>

            <button
              type="button"
              onClick={handleNativeClear}
              style={{
                padding: '8px 16px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Native All
            </button>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '10px',
              background: '#e3f2fd',
              borderRadius: '4px'
            }}
          >
            <strong>Native Form Status:</strong>
            <div>Valid: {isNativeFormValid.toString()}</div>
            <div>Touched: {isNativeFormTouched.toString()}</div>
            <div>Dirty: {isNativeFormDirty.toString()}</div>
            <div style={{ marginTop: '10px' }}>
              <strong>Native Form Values:</strong>
              <pre>{JSON.stringify(nativeFormData, null, 2)}</pre>
            </div>
          </div>
        </form>
      </div>

      {/* Form with novalidate default */}
      <div style={{ marginBottom: '30px' }}>
        <h3>2. Form with React Default (No HTML5 Validation)</h3>
        <form
          onSubmit={handleSubmitDefault}
          style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px' }}
          // React default behavior - novalidate is applied by default
        >
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Required Date Input:</strong>
            </div>
            <IxDateInput
              name="date3"
              label="Required Date"
              placeholder="Enter date (YYYY/MM/DD)"
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Date with Min/Max Range:</strong>
            </div>
            <IxDateInput
              name="date4"
              label="Date Range"
              placeholder="Date range 2023-2025"
              minDate="2023/01/01"
              maxDate="2025/12/31"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '8px 16px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Submit Form (React Default)
          </button>
        </form>
        <p>
          <small>This form uses React's default behavior (novalidate is applied by default)</small>
        </p>
      </div>

      {/* Form with explicit novalidate */}
      <div style={{ marginBottom: '30px' }}>
        <h3>3. Form with Explicit NoValidate</h3>
        <form
          noValidate
          onSubmit={handleSubmitExplicitNoValidate}
          style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px' }}
        >
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Required Date Input:</strong>
            </div>
            <IxDateInput
              name="date5"
              label="Required Date"
              placeholder="Enter date (YYYY/MM/DD)"
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>Date with Min/Max Range:</strong>
            </div>
            <IxDateInput
              name="date6"
              label="Date Range"
              placeholder="Date range 2023-2025"
              minDate="2023/01/01"
              maxDate="2025/12/31"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '8px 16px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Submit Form (Explicit NoValidate)
          </button>
        </form>
        <p><small>This form has explicit noValidate attribute</small></p>
      </div>

      {/* Individual date inputs for comparison */}
      <div style={{ marginBottom: '30px' }}>
        <h3>4. Individual Date Inputs (Outside Forms)</h3>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ marginBottom: '5px' }}>
            <strong>Required Date Input:</strong>
          </div>
          <IxDateInput
            label="Required Date"
            placeholder="Required date input"
            required
          />
          <p><small>Should show validation when invalid or empty</small></p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ marginBottom: '5px' }}>
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

      {/* Testing instructions */}
      <div
        style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '30px'
        }}
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
              <li>Form #2 (React default): Should allow submission (no HTML5 validation)</li>
              <li>Form #3 (Explicit novalidate): Should allow submission (no HTML5 validation)</li>
            </ul>
          </li>
          <li>
            <strong>Console Logging:</strong> Open browser DevTools console to see detailed form submission logs
          </li>
        </ol>
        <p><strong>Expected Behavior in React:</strong></p>
        <ul>
          <li><strong>Form #1</strong> - noValidate={false}: Browser validation enabled, will show HTML5 validation errors</li>
          <li><strong>Form #2</strong> - Default React form: Browser validation disabled (React applies novalidate by default)</li>
          <li><strong>Form #3</strong> - noValidate: Explicitly disabled browser validation (same as #2)</li>
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
          <strong>Key React Insight:</strong> React disables HTML5 validation by default.
          To enable it, use noValidate={false} explicitly.
        </p>
      </div>
    </div>
  );
}

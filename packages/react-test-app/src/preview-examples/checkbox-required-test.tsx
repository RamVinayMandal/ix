/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxButton, IxCheckbox } from '@siemens/ix-react';
import React, { useState } from 'react';

export default function CheckboxRequiredTest() {
  const [debugInfo, setDebugInfo] = useState({
    form1Submitted: false,
    form2Submitted: false,
    form3Submitted: false,
    validationErrors: [] as string[],
  });

  const handleForm1Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('=== FORM 1: HTML5 Validation (Default) ===');
    console.log('Form submitted with HTML5 validation enabled');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:');
    Object.entries(data).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    if (form.checkValidity()) {
      console.log('✅ Form is valid according to HTML5 validation');
      setDebugInfo(prev => ({
        ...prev,
        form1Submitted: true,
        validationErrors: []
      }));
    } else {
      console.log('❌ Form is invalid according to HTML5 validation');
      setDebugInfo(prev => ({
        ...prev,
        form1Submitted: false,
        validationErrors: ['HTML5 validation failed']
      }));
    }
    console.log('==========================================');
  };

  const handleForm2Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('=== FORM 2: Internal Validation (noValidate) ===');
    console.log('Form submitted with noValidate (HTML5 validation bypassed)');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:');
    Object.entries(data).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // Manual validation for required checkboxes
    const errors: string[] = [];
    if (!data.termsRequired) {
      errors.push('Terms and conditions must be accepted');
    }
    if (!data.privacyRequired) {
      errors.push('Privacy policy must be accepted');
    }

    if (errors.length === 0) {
      console.log('✅ Form submitted with internal validation');
      setDebugInfo(prev => ({
        ...prev,
        form2Submitted: true,
        validationErrors: []
      }));
    } else {
      console.log('❌ Manual validation failed:', errors);
      setDebugInfo(prev => ({
        ...prev,
        form2Submitted: false,
        validationErrors: errors
      }));
    }
    console.log('==========================================');
  };

  const handleForm3Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('=== FORM 3: Mixed Required/Optional Checkboxes ===');
    console.log('Form with both required and optional checkboxes');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:');
    Object.entries(data).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    if (form.checkValidity()) {
      console.log('✅ Mixed form is valid');
      setDebugInfo(prev => ({
        ...prev,
        form3Submitted: true,
        validationErrors: []
      }));
    } else {
      console.log('❌ Mixed form validation failed');
      setDebugInfo(prev => ({
        ...prev,
        form3Submitted: false,
        validationErrors: ['Mixed form validation failed']
      }));
    }
    console.log('==========================================');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Checkbox Required Validation Test</h1>

      {/* Form 1: HTML5 Validation Enabled */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>1. Form with HTML5 Validation (Default Behavior)</h2>
        <form onSubmit={handleForm1Submit}>
          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="termsHtml5"
              required
              onCheckedChange={(checked) => console.log('Terms HTML5 checkbox:', checked)}
            >
              I accept the terms and conditions (Required)
            </IxCheckbox>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="newsletterHtml5"
              onCheckedChange={(checked) => console.log('Newsletter HTML5 checkbox:', checked)}
            >
              Subscribe to newsletter (Optional)
            </IxCheckbox>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="privacyHtml5"
              required
              onCheckedChange={(checked) => console.log('Privacy HTML5 checkbox:', checked)}
            >
              I agree to the privacy policy (Required)
            </IxCheckbox>
          </div>

          <IxButton type="submit" variant="primary">
            Submit with HTML5 Validation
          </IxButton>

          {debugInfo.form1Submitted && (
            <div style={{ marginTop: '10px', padding: '10px', background: '#d4edda', borderRadius: '4px' }}>
              ✅ Form 1 submitted successfully!
            </div>
          )}
        </form>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Test:</strong> Try submitting without checking required checkboxes. Should show native browser validation.
        </p>
      </div>

      {/* Form 2: Internal Validation (noValidate) */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>2. Form with Internal Validation (noValidate)</h2>
        <form onSubmit={handleForm2Submit} noValidate>
          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="termsRequired"
              required
              onCheckedChange={(checked) => console.log('Terms internal checkbox:', checked)}
            >
              I accept the terms and conditions (Required)
            </IxCheckbox>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="newsletterOptional"
              onCheckedChange={(checked) => console.log('Newsletter internal checkbox:', checked)}
            >
              Subscribe to newsletter (Optional)
            </IxCheckbox>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="privacyRequired"
              required
              onCheckedChange={(checked) => console.log('Privacy internal checkbox:', checked)}
            >
              I agree to the privacy policy (Required)
            </IxCheckbox>
          </div>

          <IxButton type="submit" variant="primary">
            Submit with Internal Validation
          </IxButton>

          {debugInfo.form2Submitted && (
            <div style={{ marginTop: '10px', padding: '10px', background: '#d4edda', borderRadius: '4px' }}>
              ✅ Form 2 submitted successfully!
            </div>
          )}

          {debugInfo.validationErrors.length > 0 && !debugInfo.form2Submitted && (
            <div style={{ marginTop: '10px', padding: '10px', background: '#f8d7da', borderRadius: '4px' }}>
              <strong>Validation Errors:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                {debugInfo.validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </form>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Test:</strong> Try submitting without checking required checkboxes. Should show custom validation styling.
        </p>
      </div>

      {/* Form 3: Mixed Scenario */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>3. Mixed Required/Optional Checkboxes</h2>
        <form onSubmit={handleForm3Submit}>
          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="agreements"
              required
              onCheckedChange={(checked) => console.log('Agreements checkbox:', checked)}
            >
              I agree to all terms and agreements (Required)
            </IxCheckbox>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="marketing"
              onCheckedChange={(checked) => console.log('Marketing checkbox:', checked)}
            >
              Send me marketing emails (Optional)
            </IxCheckbox>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="analytics"
              onCheckedChange={(checked) => console.log('Analytics checkbox:', checked)}
            >
              Allow analytics tracking (Optional)
            </IxCheckbox>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <IxCheckbox
              name="dataProcessing"
              required
              onCheckedChange={(checked) => console.log('Data processing checkbox:', checked)}
            >
              I consent to data processing (Required)
            </IxCheckbox>
          </div>

          <IxButton type="submit" variant="primary">
            Submit Mixed Form
          </IxButton>

          {debugInfo.form3Submitted && (
            <div style={{ marginTop: '10px', padding: '10px', background: '#d4edda', borderRadius: '4px' }}>
              ✅ Form 3 submitted successfully!
            </div>
          )}
        </form>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Test:</strong> Only the first and last checkboxes are required. Middle ones are optional.
        </p>
      </div>

      {/* Native HTML Checkbox Comparison */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>4. Native HTML Checkbox (Reference)</h2>
        <form onSubmit={(e) => { e.preventDefault(); console.log('Native checkbox form submitted'); }}>
          <div style={{ marginBottom: '15px' }}>
            <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <legend>Required Agreements:</legend>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativeTerms" required style={{ marginRight: '8px' }} />
                I accept the Terms of Service (Required)
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativePrivacy" required style={{ marginRight: '8px' }} />
                I agree to the Privacy Policy (Required)
              </label>
            </fieldset>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <legend>Optional Preferences:</legend>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativeNewsletter" style={{ marginRight: '8px' }} />
                Subscribe to newsletter (Optional)
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativeMarketing" style={{ marginRight: '8px' }} />
                Receive marketing emails (Optional)
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativeUpdates" style={{ marginRight: '8px' }} />
                Get product updates (Optional)
              </label>
            </fieldset>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <legend>Data Consent (Required):</legend>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativeDataConsent" required style={{ marginRight: '8px' }} />
                I consent to data processing and storage (Required)
              </label>
            </fieldset>
          </div>

          <button type="submit" style={{ padding: '8px 16px', background: '#007acc', color: 'white', border: 'none', borderRadius: '4px' }}>
            Submit Native Form
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Reference:</strong> This shows how native checkboxes behave with HTML5 validation. Required checkboxes must be checked individually.
        </p>
      </div>

      {/* Additional Native Checkbox Test with noValidate */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>5. Native HTML Checkbox with noValidate (Reference)</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Native noValidate form submitted');

          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData.entries());
          console.log('Native noValidate form data:', data);

          // Manual validation example
          const errors = [];
          if (!data.nativeTermsNoValidate) errors.push('Terms must be accepted');
          if (!data.nativePrivacyNoValidate) errors.push('Privacy policy must be accepted');

          if (errors.length > 0) {
            console.log('Manual validation errors:', errors);
            alert('Validation errors: ' + errors.join(', '));
          } else {
            console.log('✅ Native noValidate form is valid');
            alert('✅ Native noValidate form submitted successfully!');
          }
        }} noValidate>
          <div style={{ marginBottom: '15px' }}>
            <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <legend>Required Agreements (with noValidate):</legend>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativeTermsNoValidate" required style={{ marginRight: '8px' }} />
                I accept the Terms of Service (Required - but noValidate)
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativePrivacyNoValidate" required style={{ marginRight: '8px' }} />
                I agree to the Privacy Policy (Required - but noValidate)
              </label>
            </fieldset>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <legend>Optional Preferences (with noValidate):</legend>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="checkbox" name="nativeNewsletterNoValidate" style={{ marginRight: '8px' }} />
                Subscribe to newsletter (Optional)
              </label>
            </fieldset>
          </div>

          <button type="submit" style={{ padding: '8px 16px', background: '#007acc', color: 'white', border: 'none', borderRadius: '4px' }}>
            Submit Native noValidate Form
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Reference:</strong> This shows how native checkboxes behave with noValidate attribute - no browser validation, only manual validation.
        </p>
      </div>

      {/* Debug Information */}
      <div style={{ marginTop: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Debug Information</h3>
        <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
          <div>Form 1 Submitted: <span style={{ color: debugInfo.form1Submitted ? 'green' : 'red' }}>{debugInfo.form1Submitted ? 'Yes' : 'No'}</span></div>
          <div>Form 2 Submitted: <span style={{ color: debugInfo.form2Submitted ? 'green' : 'red' }}>{debugInfo.form2Submitted ? 'Yes' : 'No'}</span></div>
          <div>Form 3 Submitted: <span style={{ color: debugInfo.form3Submitted ? 'green' : 'red' }}>{debugInfo.form3Submitted ? 'Yes' : 'No'}</span></div>
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Open browser console to see detailed form submission logs and checkbox state changes.
        </p>
      </div>

      {/* Test Instructions */}
      <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '4px' }}>
        <h3>Manual Testing Instructions</h3>
        <ol style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>Form 1 (HTML5 Validation):</strong> Try submitting without checking required checkboxes. Should see native browser validation tooltips.</li>
          <li><strong>Form 2 (Internal Validation):</strong> Try submitting without checking required checkboxes. Should see custom validation styling and error messages.</li>
          <li><strong>Form 3 (Mixed):</strong> Only first and last checkboxes are required. Middle ones should not block submission.</li>
          <li><strong>Form 4 (Native HTML5):</strong> Compare IX checkboxes with native HTML checkboxes. Should show similar validation behavior.</li>
          <li><strong>Form 5 (Native noValidate):</strong> Shows native checkboxes with noValidate - no browser validation, uses manual validation with alerts.</li>
          <li><strong>Console Logs:</strong> Check browser console for detailed validation and state change logs.</li>
          <li><strong>Visual Validation:</strong> Look for validation styling (red borders, error states) in internal validation mode.</li>
          <li><strong>Validation Comparison:</strong> Compare how IX checkboxes and native checkboxes handle required validation in both modes.</li>
        </ol>
      </div>
    </div>
  );
}

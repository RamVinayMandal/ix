/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxButton, IxRadio, IxRadioGroup } from '@siemens/ix-react';
import React, { useState } from 'react';

export default function RadioRequiredTest() {
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

    // Manual validation for required radio groups
    const errors: string[] = [];
    if (!data.priorityRequired) {
      errors.push('Priority selection is required');
    }
    if (!data.categoryRequired) {
      errors.push('Category selection is required');
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
    console.log('=== FORM 3: Mixed Required/Optional Radio Groups ===');
    console.log('Form with both required and optional radio groups');

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
      <h1>Radio Button Required Validation Test</h1>

      {/* Form 1: HTML5 Validation Enabled */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>1. Form with HTML5 Validation (Default Behavior)</h2>
        <form onSubmit={handleForm1Submit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Priority Level (Required):
            </label>
            <IxRadioGroup name="priorityHtml5" required>
              <IxRadio value="low" onCheckedChange={(checked) => checked && console.log('Priority HTML5: low')}>
                Low Priority
              </IxRadio>
              <IxRadio value="medium" onCheckedChange={(checked) => checked && console.log('Priority HTML5: medium')}>
                Medium Priority
              </IxRadio>
              <IxRadio value="high" onCheckedChange={(checked) => checked && console.log('Priority HTML5: high')}>
                High Priority
              </IxRadio>
              <IxRadio value="critical" onCheckedChange={(checked) => checked && console.log('Priority HTML5: critical')}>
                Critical Priority
              </IxRadio>
            </IxRadioGroup>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Notification Preferences (Optional):
            </label>
            <IxRadioGroup name="notificationsHtml5">
              <IxRadio value="email" onCheckedChange={(checked) => checked && console.log('Notifications HTML5: email')}>
                Email Only
              </IxRadio>
              <IxRadio value="sms" onCheckedChange={(checked) => checked && console.log('Notifications HTML5: sms')}>
                SMS Only
              </IxRadio>
              <IxRadio value="both" onCheckedChange={(checked) => checked && console.log('Notifications HTML5: both')}>
                Email & SMS
              </IxRadio>
              <IxRadio value="none" onCheckedChange={(checked) => checked && console.log('Notifications HTML5: none')}>
                No Notifications
              </IxRadio>
            </IxRadioGroup>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Support Level (Required):
            </label>
            <IxRadioGroup name="supportHtml5" required>
              <IxRadio value="basic" onCheckedChange={(checked) => checked && console.log('Support HTML5: basic')}>
                Basic Support
              </IxRadio>
              <IxRadio value="premium" onCheckedChange={(checked) => checked && console.log('Support HTML5: premium')}>
                Premium Support
              </IxRadio>
              <IxRadio value="enterprise" onCheckedChange={(checked) => checked && console.log('Support HTML5: enterprise')}>
                Enterprise Support
              </IxRadio>
            </IxRadioGroup>
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
          <strong>Test:</strong> Try submitting without selecting required radio options. Should show native browser validation.
        </p>
      </div>

      {/* Form 2: Internal Validation (noValidate) */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>2. Form with Internal Validation (noValidate)</h2>
        <form onSubmit={handleForm2Submit} noValidate>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Task Priority (Required):
            </label>
            <IxRadioGroup name="priorityRequired" required>
              <IxRadio value="p1" onCheckedChange={(checked) => checked && console.log('Priority internal: p1')}>
                P1 - Urgent
              </IxRadio>
              <IxRadio value="p2" onCheckedChange={(checked) => checked && console.log('Priority internal: p2')}>
                P2 - High
              </IxRadio>
              <IxRadio value="p3" onCheckedChange={(checked) => checked && console.log('Priority internal: p3')}>
                P3 - Medium
              </IxRadio>
              <IxRadio value="p4" onCheckedChange={(checked) => checked && console.log('Priority internal: p4')}>
                P4 - Low
              </IxRadio>
            </IxRadioGroup>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Update Frequency (Optional):
            </label>
            <IxRadioGroup name="frequencyOptional">
              <IxRadio value="daily" onCheckedChange={(checked) => checked && console.log('Frequency internal: daily')}>
                Daily Updates
              </IxRadio>
              <IxRadio value="weekly" onCheckedChange={(checked) => checked && console.log('Frequency internal: weekly')}>
                Weekly Updates
              </IxRadio>
              <IxRadio value="monthly" onCheckedChange={(checked) => checked && console.log('Frequency internal: monthly')}>
                Monthly Updates
              </IxRadio>
            </IxRadioGroup>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Project Category (Required):
            </label>
            <IxRadioGroup name="categoryRequired" required>
              <IxRadio value="development" onCheckedChange={(checked) => checked && console.log('Category internal: development')}>
                Development
              </IxRadio>
              <IxRadio value="testing" onCheckedChange={(checked) => checked && console.log('Category internal: testing')}>
                Testing
              </IxRadio>
              <IxRadio value="deployment" onCheckedChange={(checked) => checked && console.log('Category internal: deployment')}>
                Deployment
              </IxRadio>
              <IxRadio value="maintenance" onCheckedChange={(checked) => checked && console.log('Category internal: maintenance')}>
                Maintenance
              </IxRadio>
            </IxRadioGroup>
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
          <strong>Test:</strong> Try submitting without selecting required radio options. Should show custom validation styling.
        </p>
      </div>

      {/* Form 3: Mixed Scenario */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>3. Mixed Required/Optional Radio Groups</h2>
        <form onSubmit={handleForm3Submit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Service Type (Required):
            </label>
            <IxRadioGroup name="serviceType" required>
              <IxRadio value="basic" onCheckedChange={(checked) => checked && console.log('Service: basic')}>
                Basic Service
              </IxRadio>
              <IxRadio value="standard" onCheckedChange={(checked) => checked && console.log('Service: standard')}>
                Standard Service
              </IxRadio>
              <IxRadio value="premium" onCheckedChange={(checked) => checked && console.log('Service: premium')}>
                Premium Service
              </IxRadio>
            </IxRadioGroup>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Billing Cycle (Optional):
            </label>
            <IxRadioGroup name="billingCycle">
              <IxRadio value="monthly" onCheckedChange={(checked) => checked && console.log('Billing: monthly')}>
                Monthly
              </IxRadio>
              <IxRadio value="quarterly" onCheckedChange={(checked) => checked && console.log('Billing: quarterly')}>
                Quarterly
              </IxRadio>
              <IxRadio value="yearly" onCheckedChange={(checked) => checked && console.log('Billing: yearly')}>
                Yearly
              </IxRadio>
            </IxRadioGroup>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Contact Method (Optional):
            </label>
            <IxRadioGroup name="contactMethod">
              <IxRadio value="phone" onCheckedChange={(checked) => checked && console.log('Contact: phone')}>
                Phone
              </IxRadio>
              <IxRadio value="email" onCheckedChange={(checked) => checked && console.log('Contact: email')}>
                Email
              </IxRadio>
              <IxRadio value="chat" onCheckedChange={(checked) => checked && console.log('Contact: chat')}>
                Live Chat
              </IxRadio>
            </IxRadioGroup>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Agreement Terms (Required):
            </label>
            <IxRadioGroup name="agreementTerms" required>
              <IxRadio value="accept" onCheckedChange={(checked) => checked && console.log('Agreement: accept')}>
                I Accept All Terms
              </IxRadio>
              <IxRadio value="decline" onCheckedChange={(checked) => checked && console.log('Agreement: decline')}>
                I Decline
              </IxRadio>
            </IxRadioGroup>
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
          <strong>Test:</strong> Only "Service Type" and "Agreement Terms" are required. Others are optional.
        </p>
      </div>

      {/* Native HTML Radio Comparison */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>4. Native HTML Radio Buttons (Reference)</h2>
        <form onSubmit={(e) => { e.preventDefault(); console.log('Native radio form submitted'); }}>
          <div style={{ marginBottom: '15px' }}>
            <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <legend>Payment Method (Required):</legend>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="radio" name="nativePayment" value="credit" required style={{ marginRight: '8px' }} />
                Credit Card
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="radio" name="nativePayment" value="debit" required style={{ marginRight: '8px' }} />
                Debit Card
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="radio" name="nativePayment" value="paypal" required style={{ marginRight: '8px' }} />
                PayPal
              </label>
            </fieldset>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <legend>Shipping Speed (Optional):</legend>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="radio" name="nativeShipping" value="standard" style={{ marginRight: '8px' }} />
                Standard (5-7 days)
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="radio" name="nativeShipping" value="express" style={{ marginRight: '8px' }} />
                Express (2-3 days)
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                <input type="radio" name="nativeShipping" value="overnight" style={{ marginRight: '8px' }} />
                Overnight
              </label>
            </fieldset>
          </div>

          <button type="submit" style={{ padding: '8px 16px', background: '#007acc', color: 'white', border: 'none', borderRadius: '4px' }}>
            Submit Native Form
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <strong>Reference:</strong> This shows how native radio buttons behave with HTML5 validation.
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
          Open browser console to see detailed form submission logs and radio button state changes.
        </p>
      </div>

      {/* Test Instructions */}
      <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '4px' }}>
        <h3>Manual Testing Instructions</h3>
        <ol style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>Form 1 (HTML5 Validation):</strong> Try submitting without selecting required radio groups. Should see native browser validation messages.</li>
          <li><strong>Form 2 (Internal Validation):</strong> Try submitting without selecting required radio groups. Should see custom validation styling and error messages.</li>
          <li><strong>Form 3 (Mixed):</strong> Only "Service Type" and "Agreement Terms" are required. Others should not block submission.</li>
          <li><strong>Native Reference:</strong> Compare behavior with native HTML radio buttons in fieldsets.</li>
          <li><strong>Console Logs:</strong> Check browser console for detailed validation and selection logs.</li>
          <li><strong>Visual Validation:</strong> Look for validation styling (red borders, error states) in internal validation mode.</li>
          <li><strong>Radio Group Behavior:</strong> Ensure only one option can be selected per group and selections are mutually exclusive.</li>
        </ol>
      </div>
    </div>
  );
}

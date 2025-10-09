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

export default function CheckboxGroupRequiredTest() {
    const [form, setForm] = useState(initialFormState);
    const [touched, setTouched] = useState(initialTouched);

    const isValid = form.agreed || form.most;
    const shouldShowError = !isValid && (touched.agreed || touched.most);

    const handleCheckboxChange = (name: string, checked: boolean) => {
        console.log(`Checkbox ${name} changed to: ${checked}`);
        setForm((prev) => ({ ...prev, [name]: checked }));
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mark all as touched on submit attempt
        setTouched({ agreed: true, most: true });
        console.log('=== CHECKBOX GROUP FORM SUBMISSION ===');
        console.log('Form submitted with values:', form);
        console.log('Form Valid (at least one required):', isValid);
        console.log('Form Touched:', touched);
        console.log('Should Show Error:', shouldShowError);
        console.log('====================================');
    };

    // Test reset functionality - should clear both values and touched state
    const handleReset = () => {
        console.log('=== FORM RESET TEST ===');
        console.log('Before reset - Values:', form);
        console.log('Before reset - Touched:', touched);
        console.log('Before reset - Should Show Error:', shouldShowError);

        // Reset both form values and touched state (like Angular form.reset())
        setForm(initialFormState);
        setTouched(initialTouched);

        console.log('After reset - Values:', initialFormState);
        console.log('After reset - Touched:', initialTouched);
        console.log('After reset - Should Show Error: false (because touched is reset)');
        console.log('===========================');
    };

    const handleTouchCheckboxes = () => {
        console.log('=== MANUALLY TOUCHING CHECKBOXES ===');
        setTouched({ agreed: true, most: true });
        console.log('All checkboxes marked as touched for testing');
        console.log('=====================================');
    };

    return (
        <div style={{ padding: 20, maxWidth: 600, height: 600, overflow: 'scroll' }}>
            <h2>IX Checkbox Group - Required & Reset Testing</h2>

            <form noValidate onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 4, marginBottom: 20 }}>
                <h3>Terms Agreement Form (Required)</h3>

                <IxCheckboxGroup
                    label="Terms of something (At least one required)"
                    invalidText="Please select at least one option"
                >
                    <IxCheckbox
                        label="I agree everything"
                        name="agreed"
                        checked={form.agreed}
                        required={true}
                        onCheckedChange={(e: CustomEvent<boolean>) => handleCheckboxChange('agreed', e.detail)}
                    />
                    <IxCheckbox
                        label="I agree with most of it"
                        name="most"
                        checked={form.most}
                        required={true}
                        onCheckedChange={(e: CustomEvent<boolean>) => handleCheckboxChange('most', e.detail)}
                    />
                </IxCheckboxGroup>



                <div style={{ marginTop: 20 }}>
                    <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: 4, marginRight: 10 }}>
                        Submit
                    </button>
                    <button type="button" onClick={handleReset} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: 4, marginRight: 10 }}>
                        Reset (Test)
                    </button>
                    <button type="button" onClick={handleTouchCheckboxes} style={{ padding: '8px 16px', background: '#ffc107', color: 'black', border: 'none', borderRadius: 4 }}>
                        Touch All (Test)
                    </button>
                </div>

                <div style={{ marginTop: 15, padding: 10, background: '#f8f9fa', borderRadius: 4 }}>
                    <div><strong>Test Status:</strong></div>
                    <div>✓ I agree everything: {form.agreed ? 'Checked' : 'Unchecked'} {touched.agreed ? '(Touched)' : '(Untouched)'}</div>
                    <div>✓ I agree with most of it: {form.most ? 'Checked' : 'Unchecked'} {touched.most ? '(Touched)' : '(Untouched)'}</div>
                    <div>✓ Form Valid (at least one): {isValid ? 'true' : 'false'}</div>
                    <div>✓ Should Show Error: {shouldShowError ? 'true' : 'false'}</div>
                    <div>✓ Any Touched: {Object.values(touched).some(Boolean) ? 'true' : 'false'}</div>
                </div>
            </form>

            {/* Test Instructions */}
            <div style={{ background: '#e3f2fd', padding: 15, borderRadius: 4 }}>
                <h3>🧪 Test Scenario:</h3>
                <ol>
                    <li><strong>Initial State:</strong> Both checkboxes unchecked and untouched - No error should show</li>
                    <li><strong>Touch Test:</strong> Click "Touch All" - Error should appear (touched but invalid)</li>
                    <li><strong>Reset Test:</strong> Click "Reset" - Error should disappear (values and touched state reset)</li>
                    <li><strong>Manual Test:</strong> Check one checkbox, then uncheck it - Error should appear</li>
                    <li><strong>Reset Again:</strong> Click "Reset" - Error should disappear again</li>
                </ol>
                <p><strong>Expected:</strong> Reset should clear both checkbox values AND touched state, making validation error disappear.</p>
            </div>
        </div>
    );
}
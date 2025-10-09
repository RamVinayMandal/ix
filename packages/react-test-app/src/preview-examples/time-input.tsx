/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IxTimeInput } from '@siemens/ix-react';


import React, { useRef, useState } from 'react';

export default function TimeInputExample() {
  const timeInputRef = useRef<any>(null);
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);

  const handleValueChange = (event: CustomEvent<string>) => {
    const val = event.detail ?? '';
    setValue(val);
    setTouched(true);
    // Simple validation: valid if not empty and not 'invalid'
    setValid(!!val && val !== 'invalid');
    setInvalid(!val || val === 'invalid');
    setInputInvalid(!val || val === 'invalid');
  };

  const setEmptyProgrammatically = () => {
    if (timeInputRef.current) {
      timeInputRef.current.value = '';
      setTouched(true);
      setValue('');
      setValid(false);
      setInvalid(true);
      setInputInvalid(true);
    }
  };

  const resetValue = () => {
    if (timeInputRef.current) {
      timeInputRef.current.value = null;
      setTouched(false);
      setValue('');
      setValid(true);
      setInvalid(false);
      setInputInvalid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { touched, value, valid, invalid, inputInvalid });
  };

  return (
    <form novalidate onSubmit={handleSubmit}>
      <IxTimeInput required ref={timeInputRef} onValueChange={handleValueChange} />
      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={setEmptyProgrammatically}>
          Set Empty Programmatically
        </button>
        <button type="button" onClick={resetValue}>
          Reset Value (remove touched state)
        </button>
        <button type="submit">Submit</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <div>Touched: {String(touched)}</div>
        <div>Value: {value}</div>
        <div>Valid: {String(valid)}</div>
        <div>Invalid: {String(invalid)}</div>
        <div>Input Invalid: {String(inputInvalid)}</div>
      </div>
    </form>
  );


}

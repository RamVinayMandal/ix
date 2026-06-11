/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxDateInput } from '@siemens/ix-react';
import { useRef, useState } from 'react';

// ─── types ───────────────────────────────────────────────────────────────────

interface LogEntry {
  id: string;
  message: string;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function sectionStyle(color: string) {
  return { border: `1px solid ${color}`, padding: '1rem', borderRadius: '4px' };
}

function btn(bg: string): React.CSSProperties {
  return {
    padding: '0.35rem 0.7rem',
    fontSize: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: bg,
    color: 'white',
  };
}

// ─── main component ───────────────────────────────────────────────────────────

export default function DateInputFormTest() {
  const logCounter = useRef(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Section state
  const [s1, setS1] = useState(''); // Required standalone
  const [s2, setS2] = useState(''); // Optional standalone
  const [s3, setS3] = useState('aa'); // Required in form
  const [s4, setS4] = useState(''); // Optional in form
  const [s5, setS5] = useState(''); // Required novalidate form
  const [s6, setS6] = useState(''); // Optional novalidate form

  // Section refs
  const r1 = useRef<HTMLIxDateInputElement>(null);
  const r2 = useRef<HTMLIxDateInputElement>(null);
  const r3 = useRef<HTMLIxDateInputElement>(null);
  const r4 = useRef<HTMLIxDateInputElement>(null);
  const r5 = useRef<HTMLIxDateInputElement>(null);
  const r6 = useRef<HTMLIxDateInputElement>(null);

  // ── logging ──────────────────────────────────────────────────────────────

  const log = (msg: string) => {
    logCounter.current += 1;
    const id = `${Date.now()}-${logCounter.current}`;
    setLogs((prev) => [
      ...prev,
      { id, message: `[${new Date().toLocaleTimeString()}] ${msg}` },
    ]);
  };

  const inspect = async (
    ref: React.RefObject<HTMLIxDateInputElement | null>,
    label: string
  ) => {
    const el = ref.current;
    if (!el) return;
    const classes = Array.from(el.classList).filter((c) =>
      c.startsWith('ix-invalid')
    );
    const nativeInput = await el.getNativeInputElement();
    const inputClasses = Array.from(nativeInput.classList).filter((c) =>
      c.startsWith('is-invalid')
    );
    const touched = await (el as any).isTouched?.();
    console.log(
      `${label} | value="${el.value}" required=${el.required} ` +
        `touched=${touched} host=[${classes.join(
          ','
        )}] input=[${inputClasses.join(',')}]`
    );
  };

  // ── actions ───────────────────────────────────────────────────────────────

  const manualBlur = async (
    ref: React.RefObject<HTMLIxDateInputElement | null>,
    label: string
  ) => {
    const el = ref.current;
    if (!el) return;
    const nativeInput = await el.getNativeInputElement();
    // Focus first so blur actually fires the component's onBlur handler
    nativeInput.focus();
    await new Promise((r) => setTimeout(r, 30));
    nativeInput.blur();
    // Small delay to let the component's onBlur handler run
    await new Promise((r) => setTimeout(r, 50));
    await inspect(ref, `${label} after blur`);
  };

  const clearField = async (
    ref: React.RefObject<HTMLIxDateInputElement | null>,
    setter: (v: string) => void,
    label: string
  ) => {
    const el = ref.current;
    if (!el) return;
    await el.clear();
    setter('');
    console.log(`${label} clear() called`);
    await inspect(ref, `${label} after clear`);
  };

  const callReportValidity = async (
    ref: React.RefObject<HTMLIxDateInputElement | null>,
    label: string
  ) => {
    const el = ref.current;
    if (!el) return;
    const valid = await el.reportValidity();
    console.log(
      `${label} reportValidity() → ${valid ? '✅ valid' : '❌ invalid'}`
    );
    await inspect(ref, `${label} after reportValidity`);
  };

  // ── section actions row — plain function, NOT a React component ──────────
  // Using a React component here would cause remounts on every render,
  // silently breaking onClick closures and preventing logs from firing.

  const actionRow = (
    id: string,
    r: React.RefObject<HTMLIxDateInputElement | null>,
    setter: (v: string) => void,
    inForm = false
  ) => (
    <div
      style={{
        display: 'flex',
        gap: '0.4rem',
        marginTop: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      <button
        type="button"
        style={btn('#607d8b')}
        onClick={() => {
          setter('');
          console.log(`${id} → Empty`);
        }}
      >
        Empty
      </button>
      <button
        type="button"
        style={btn('#4caf50')}
        onClick={() => {
          setter('2024/12/25');
          console.log(`${id} → Valid`);
        }}
      >
        Valid
      </button>
      <button
        type="button"
        style={btn('#f44336')}
        onClick={() => {
          setter('bad-date');
          console.log(`${id} → Invalid`);
        }}
      >
        Invalid
      </button>
      <button
        type="button"
        style={btn('#ff9800')}
        onClick={() => manualBlur(r, id)}
      >
        Manual Blur
      </button>
      <button
        type="button"
        style={btn('#9c27b0')}
        onClick={() => clearField(r, setter, id)}
      >
        clear()
      </button>
      <button
        type="button"
        style={btn('#1976d2')}
        onClick={() => callReportValidity(r, id)}
      >
        reportValidity()
      </button>
      {inForm && (
        <button type="submit" style={btn('#00897b')}>
          Submit Form
        </button>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ padding: '1rem', fontSize: '0.875rem', maxWidth: '1100px' }}>
      <h2 style={{ marginBottom: '0.25rem' }}>
        Date Input — Validation Scenarios (WCAG 3.3.1)
      </h2>
      <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>
        Format: <code>yyyy/MM/dd</code> &nbsp;|&nbsp; Valid example:{' '}
        <code>2024/12/25</code> &nbsp;|&nbsp; Invalid example:{' '}
        <code>bad-date</code>
      </p>
      <p
        style={{
          margin: '0 0 1rem 0',
          padding: '0.5rem 0.75rem',
          borderRadius: '4px',
          fontSize: '0.8rem',
        }}
      >
        <strong>Expected:</strong> No red on initial load or programmatic set.
        Red appears only after blur, form submit, or{' '}
        <code>reportValidity()</code>.
      </p>

      <button
        style={{ ...btn('#455a64'), marginBottom: '1rem' }}
        onClick={() => setLogs([])}
      >
        Clear Log
      </button>

      {/* ── 2-column grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* 1 — Required Standalone (AJAX scenario) */}
        <div style={sectionStyle('#f44336')}>
          <strong>1. Required — Standalone (AJAX save)</strong>
          <div>
            <IxDateInput
              ref={r1}
              label="Required Date"
              required
              value={s1}
              onValueChange={(e) => setS1(e.detail ?? '')}
              onBlur={() => inspect(r1, '1')}
            />
            {actionRow('1', r1, setS1)}
          </div>
        </div>

        {/* 2 — Optional Standalone */}
        <div style={sectionStyle('#4caf50')}>
          <strong>2. Optional — Standalone</strong>
          <div>
            <IxDateInput
              ref={r2}
              label="Optional Date"
              value={s2}
              onValueChange={(e) => setS2(e.detail ?? '')}
              onBlur={() => inspect(r2, '2')}
            />
            {actionRow('2', r2, setS2)}
          </div>
        </div>

        {/* 3 — Required in form */}
        <div style={sectionStyle('#1976d2')}>
          <strong>3. Required — In Form</strong>
          <form
            onSubmit={(e) => {
              console.log('3 form submit event fired');
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              if (!form.reportValidity()) {
                console.log('3 form submit blocked — invalid fields');
                return;
              }
              console.log('3 form submitted ✅');
            }}
          >
            <IxDateInput
              ref={r3}
              label="Required Date"
              required
              value={s3}
              onValueChange={(e) => setS3(e.detail ?? '')}
              onBlur={() => inspect(r3, '3')}
            />
            {actionRow('3', r3, setS3, true)}
          </form>
        </div>

        {/* 4 — Optional in form */}
        <div style={sectionStyle('#00897b')}>
          <strong>4. Optional — In Form</strong>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              if (!form.reportValidity()) {
                console.log('4 form submit blocked — invalid fields');
                return;
              }
              console.log('4 form submitted ✅');
            }}
          >
            <IxDateInput
              ref={r4}
              label="Optional Date"
              value={s4}
              onValueChange={(e) => setS4(e.detail ?? '')}
              onBlur={() => inspect(r4, '4')}
            />
            {actionRow('4', r4, setS4, true)}
          </form>
        </div>

        {/* 5 — Required novalidate form */}
        <div style={sectionStyle('#ff9800')}>
          <strong>5. Required — novalidate Form</strong>
          <p
            style={{
              margin: '0 0 0.4rem 0',
              fontSize: '0.75rem',
              color: '#555',
            }}
          >
            Visual errors are suppressed after blur and submit. Explicit{' '}
            <code>reportValidity()</code> still surfaces them.
          </p>
          <form
            noValidate
            onSubmit={async (e) => {
              console.log(
                '5 submit event fired (noValidate — browser skipped constraint validation)'
              );
              e.preventDefault();
              await inspect(r5, '5 on-submit');
              console.log('5 novalidate form submitted ✅');
            }}
          >
            <IxDateInput
              ref={r5}
              label="Required Date"
              required
              value={s5}
              onValueChange={(e) => {
                setS5(e.detail ?? '');
                console.log(`5 valueChange → "${e.detail ?? ''}"`);
              }}
              onBlur={() => inspect(r5, '5 blur')}
            />
            {actionRow('5', r5, setS5, true)}
          </form>
        </div>

        {/* 6 — Optional novalidate form */}
        <div style={sectionStyle('#9c27b0')}>
          <strong>6. Optional — novalidate Form</strong>
          <p
            style={{
              margin: '0 0 0.4rem 0',
              fontSize: '0.75rem',
              color: '#555',
            }}
          >
            Visual errors are suppressed after blur and submit. Explicit{' '}
            <code>reportValidity()</code> still surfaces them.
          </p>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              console.log(
                '6 novalidate form submitted ✅ (submit bypassed validation due to noValidate)'
              );
            }}
          >
            <IxDateInput
              ref={r6}
              label="Optional Date"
              value={s6}
              onValueChange={(e) => setS6(e.detail ?? '')}
              onBlur={() => inspect(r6, '6')}
            />
            {actionRow('6', r6, setS6, true)}
          </form>
        </div>
      </div>

      {/* ── Initial invalid value scenario ── */}
      <div style={{ ...sectionStyle('#607d8b'), marginBottom: '1rem' }}>
        <strong>
          7. Initial invalid default value — must NOT show red on load (WCAG
          3.3.1)
        </strong>
        <p
          style={{
            margin: '0.25rem 0 0.5rem 0',
            fontSize: '0.75rem',
            color: '#555',
          }}
        >
          Field loads with <code>value="bad-date"</code>. Inspect it immediately
          — no red border should appear until after blur.
        </p>
        <IxDateInput
          label="Date with invalid default"
          value="bad-date"
          onBlur={async () => {
            const el =
              document.querySelector<HTMLIxDateInputElement>('#s7-input');
            if (el) {
              const nativeInput = await el.getNativeInputElement();
              const cls = Array.from(nativeInput.classList);
              console.log(`7 after blur | input classes: [${cls.join(', ')}]`);
            }
          }}
          id="s7-input"
        />
        <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: '#888' }}>
          ✅ Expected on load: no <code>is-invalid</code> class on the inner
          input.
          <br />✅ Expected after blur: <code>is-invalid</code> appears.
        </p>
      </div>

      {/* ── Log panel ── */}
      <div>
        <h3 style={{ margin: '0 0 0.4rem 0' }}>Event Log</h3>
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.75rem',
            maxHeight: '280px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            background: '#fafafa',
          }}
        >
          {logs.length === 0 ? (
            <span style={{ color: '#999', fontStyle: 'italic' }}>
              Interact with fields above to see state changes here.
            </span>
          ) : (
            logs.map((entry) => {
              const color = entry.message.includes('❌')
                ? '#c62828'
                : entry.message.includes('✅')
                ? '#2e7d32'
                : 'inherit';
              return (
                <div key={entry.id} style={{ color, lineHeight: '1.6' }}>
                  {entry.message}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

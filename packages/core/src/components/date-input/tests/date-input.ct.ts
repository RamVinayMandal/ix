/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Locator, expect } from '@playwright/test';
import {
  getFormValue,
  preventFormSubmission,
  regressionTest,
} from '@utils/test';

const createDateInputAccessor = async (dateInput: Locator) => {
  const handle = {
    openByCalender: async () => {
      const trigger = dateInput.getByTestId('open-calendar');
      await trigger.click();
    },
    selectDay: async (day: number) => {
      const dayButton = dateInput
        .locator('ix-dropdown')
        .filter({ hasText: day.toString() })
        .getByText(day.toString());
      await dayButton.click();
    },
  };

  return handle;
};

regressionTest('renders', async ({ mount, page }) => {
  await mount(`<ix-date-input value="2024/05/05"></ix-date-input>`);
  const dateInputElement = page.locator('ix-date-input');
  await expect(dateInputElement).toHaveClass(/hydrated/);
});

regressionTest(
  'select date by open calendar trigger',
  async ({ mount, page }) => {
    await mount(`<ix-date-input value="2024/05/05"></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);

    const dateInput = await createDateInputAccessor(dateInputElement);
    await dateInput.openByCalender();

    await dateInput.selectDay(10);
    await expect(dateInputElement).toHaveAttribute('value', '2024/05/10');
  }
);

regressionTest('select date by focus', async ({ mount, page }) => {
  await mount(`<ix-date-input value="2024/05/05"></ix-date-input>`);
  const dateInputElement = page.locator('ix-date-input');
  await expect(dateInputElement).toHaveClass(/hydrated/);

  const dateInput = await createDateInputAccessor(dateInputElement);
  await dateInputElement.locator('input').focus();

  await dateInput.selectDay(10);
  await expect(dateInputElement).toHaveAttribute('value', '2024/05/10');
  await expect(dateInputElement.getByTestId('date-dropdown')).not.toHaveClass(
    /show/
  );
});

regressionTest('select date by input', async ({ mount, page }) => {
  await mount(`<ix-date-input value="2024/05/05"></ix-date-input>`);
  const dateInputElement = page.locator('ix-date-input');
  await expect(dateInputElement).toHaveClass(/hydrated/);

  const dateInput = await createDateInputAccessor(dateInputElement);
  await dateInputElement.locator('input').focus();
  await expect(dateInputElement.getByTestId('date-dropdown')).toHaveClass(
    /show/
  );
  await dateInputElement.locator('input').fill('2025/10/10');

  await expect(dateInputElement.getByTestId('date-dropdown')).not.toHaveClass(
    /show/
  );
  await expect(dateInputElement).toHaveAttribute('value', '2025/10/10');

  await dateInput.openByCalender();

  await expect(dateInputElement.locator('.calendar-item.selected')).toHaveText(
    '10'
  );
});

regressionTest(
  'select date by input with invalid date',
  async ({ mount, page }) => {
    await mount(`<ix-date-input value="2024/05/05"></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);

    const dateInput = await createDateInputAccessor(dateInputElement);
    await dateInputElement.locator('input').fill('2025/10/10/10');
    await dateInput.openByCalender();
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10/10');

    await expect(
      dateInputElement
        .locator('ix-field-wrapper')
        .locator('ix-typography')
        .filter({ hasText: 'Date is not valid' })
    ).toHaveText('Date is not valid');
  }
);

regressionTest(
  'select date by input with invalid date - i18n',
  async ({ mount, page }) => {
    await mount(
      `<ix-date-input value="2024/05/05" i18n-error-date-unparsable="Datum nicht korrekt!"></ix-date-input>`
    );
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);

    const dateInput = await createDateInputAccessor(dateInputElement);
    await dateInputElement.locator('input').fill('2025/10/10/10');
    await dateInput.openByCalender();
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10/10');

    await expect(
      dateInputElement
        .locator('ix-field-wrapper')
        .locator('ix-typography')
        .filter({ hasText: 'Datum nicht korrekt!' })
    ).toHaveText('Datum nicht korrekt!');
  }
);

regressionTest('required', async ({ mount, page }) => {
  await mount(`<ix-date-input required label="MyLabel"></ix-date-input>`);
  const dateInputElement = page.locator('ix-date-input');
  const input = dateInputElement.locator('input');
  await expect(dateInputElement).toHaveAttribute('required');

  await expect(dateInputElement.locator('ix-field-label')).toHaveText(
    'MyLabel*'
  );

  await input.focus();
  await input.blur();

  await expect(dateInputElement).toHaveClass(/ix-invalid--required/);
});

regressionTest(`form-ready - ix-date-input`, async ({ mount, page }) => {
  await mount(
    `<form><ix-date-input name="my-field-name"></ix-date-input></form>`
  );

  const formElement = page.locator('form');
  preventFormSubmission(formElement);
  const input = page.locator('ix-date-input').locator('input');
  await input.fill('2024/05/05');
  await input.blur();

  const formData = await getFormValue(formElement, 'my-field-name', page);
  expect(formData).toBe('2024/05/05');
});

regressionTest(
  `form-ready - ix-date-input initial value`,
  async ({ mount, page }) => {
    await mount(
      `<form><ix-date-input name="my-field-name" value="2024/12/12"></ix-date-input></form>`
    );

    const formElement = page.locator('form');
    preventFormSubmission(formElement);
    const formData = await getFormValue(formElement, 'my-field-name', page);
    expect(formData).toBe('2024/12/12');
  }
);

regressionTest(
  'updating component value attribute updates validity',
  async ({ page, mount }) => {
    await mount(`<ix-date-input value="2024/05/05"></ix-date-input>`);

    const dateInput = page.locator('ix-date-input');
    const input = page.locator('input');

    await dateInput.evaluateHandle((el) => {
      el.setAttribute('value', 'invalid-date');
    });

    await expect(input).toHaveClass(/is-invalid/);

    await dateInput.evaluateHandle((el) => {
      el.setAttribute('value', '2024/05/05');
    });

    await expect(input).not.toHaveClass(/is-invalid/);
  }
);

regressionTest(
  'Required input:After entering invalid-date, removing the value with the keyboard, the field should remain invalid.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input required label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10/10');
    const input = dateInputElement.locator('input');
    await input.focus();
    await input.fill('');
    await input.blur();
    await expect(dateInputElement).toHaveClass(/ix-invalid--required/);
  }
);

regressionTest(
  'Required input: After entering invalid-date, clearing the touched state (simulating clear button) should make the field valid again.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input required label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10/10');
    const input = dateInputElement.locator('input');

    await input.focus();
    await input.blur();
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      el.value = undefined;
    });
    await expect(dateInputElement).not.toHaveClass(/ix-invalid--required/);
  }
);

regressionTest(
  'Required input: After entering invalid-date, programmatically setting value to empty should keep field invalid.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input required label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10/10');
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      el.value = '';
    });

    const input = dateInputElement.locator('input');
    await input.focus();
    await input.blur();

    await expect(dateInputElement).toHaveClass(/ix-invalid--required/);
  }
);

regressionTest(
  'Required input:After entering valid-date, removing the value with the keyboard, the field should remain invalid.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input required label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10');
    const input = dateInputElement.locator('input');
    await input.focus();
    await input.fill('');
    await input.blur();
    await expect(dateInputElement).toHaveClass(/ix-invalid--required/);
  }
);

regressionTest(
  'Required input: After entering valid-date, clearing the touched state (simulating clear button) should make the field valid again.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input required label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10');
    const input = dateInputElement.locator('input');

    await input.focus();
    await input.blur();
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      el.value = undefined;
    });
    await expect(dateInputElement).not.toHaveClass(/ix-invalid--required/);
  }
);

regressionTest(
  'Required input: After entering valid-date, programmatically setting value to empty should keep field invalid.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input required label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10');
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      el.value = '';
    });

    const input = dateInputElement.locator('input');
    await input.focus();
    await input.blur();
    await expect(dateInputElement).toHaveClass(/ix-invalid--required/);
  }
);

regressionTest(
  'Not Required input: After entering invalid-date, removing the value with the keyboard, the field should remain valid.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10/10');

    const input = dateInputElement.locator('input');
    await input.focus();
    await input.fill('');
    await input.blur();
    await expect(dateInputElement).not.toHaveClass(/is-invalid/);
  }
);

regressionTest(
  'Not Required input: After entering invalid-date, clearing the touched state (simulating clear button) should make the field valid again.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input  label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10/10');
    const input = dateInputElement.locator('input');

    await input.focus();
    await input.blur();
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      el.value = undefined;
    });
    await expect(dateInputElement).not.toHaveClass(/is-invalid/);
  }
);

regressionTest(
  'Not Required input: After entering invalid-date, programmatically setting value to empty should keep field valid.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input  label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10/10');
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      el.value = '';
    });
    await expect(dateInputElement).not.toHaveClass(/is-invalid/);
  }
);

regressionTest(
  'Not Required input:After entering valid-date, removing the value with the keyboard, the field should remain valid.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input  label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10');

    const input = dateInputElement.locator('input');
    await input.focus();
    await input.fill('');
    await input.blur();
    await expect(dateInputElement).not.toHaveClass(/is-invalid/);
  }
);

regressionTest(
  'Not Required input: After entering valid-date, clearing the touched state (simulating clear button) should make the field valid again.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input  label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10');
    const input = dateInputElement.locator('input');

    await input.focus();
    await input.blur();
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      el.value = undefined;
    });
    await expect(dateInputElement).not.toHaveClass(/is-invalid/);
  }
);

regressionTest(
  'Not Required input: After entering valid-date, programmatically setting value to empty should keep field valid.',
  async ({ mount, page }) => {
    await mount(`<ix-date-input  label="MyLabel" ></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);
    await dateInputElement.locator('input').fill('2025/10/10');
    await expect(dateInputElement).toHaveAttribute('value', '2025/10/10');
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      el.value = '';
    });
    await expect(dateInputElement).not.toHaveClass(/is-invalid/);
  }
);

regressionTest(
  'clear() method should reset value and touched state for required field',
  async ({ mount, page }) => {
    await mount(`<ix-date-input required label="MyLabel"></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);

    const input = dateInputElement.locator('input');
    await input.focus();
    await input.fill('temp');
    await input.fill('');
    await input.blur();

    await expect(dateInputElement).toHaveClass(/ix-invalid--required/);

    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      return el.clear();
    });

    await expect(dateInputElement).not.toHaveClass(/ix-invalid--required/);
    await expect(dateInputElement).toHaveAttribute('value', '');
  }
);

regressionTest(
  'clear() method should work for optional field',
  async ({ mount, page }) => {
    await mount(`<ix-date-input label="MyLabel"></ix-date-input>`);
    const dateInputElement = page.locator('ix-date-input');
    await expect(dateInputElement).toHaveClass(/hydrated/);

    // Enter invalid date
    await dateInputElement.locator('input').fill('invalid-date');
    await expect(dateInputElement).toHaveAttribute('value', 'invalid-date');

    // Use clear() method
    await dateInputElement.evaluate((el: HTMLIxDateInputElement) => {
      return el.clear();
    });

    // Should be cleared and valid
    await expect(dateInputElement).toHaveAttribute('value', '');
    await expect(dateInputElement).not.toHaveClass(/ix-invalid/);
  }
);

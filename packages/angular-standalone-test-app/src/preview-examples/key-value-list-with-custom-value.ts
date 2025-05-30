/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { IxKeyValueList, IxKeyValue } from '@siemens/ix-angular/standalone';

@Component({
  standalone: true,
  selector: 'app-example',
  imports: [IxKeyValueList, IxKeyValue],
  template: `
    <ix-key-value-list>
      <ix-key-value label="Label" labelPosition="left">
        <input placeholder="Enter text here" type="text" slot="custom-value" />
      </ix-key-value>

      <ix-key-value label="Label" labelPosition="left">
        <input placeholder="Enter text here" type="text" slot="custom-value" />
      </ix-key-value>

      <ix-key-value label="Label" labelPosition="left">
        <input placeholder="Enter text here" type="text" slot="custom-value" />
      </ix-key-value>
    </ix-key-value-list>
  `,
  styleUrls: ['./key-value-list-with-custom-value.css'],
})
export default class KeyValueListWithCustomValue {}

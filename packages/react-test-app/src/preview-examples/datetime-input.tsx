/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxDatetimeInput } from '@siemens/ix-react';

function DatetimeInput() {
  return (
    <IxDatetimeInput
      label="13:00–17:30"
      value="2026/04/28 14:00:00"
      minDate="2026/04/20"
      maxDate="2026/04/29"
      minTime="13:10:00"
      maxTime="17:30:00"
    ></IxDatetimeInput>
  );
}

export default DatetimeInput;

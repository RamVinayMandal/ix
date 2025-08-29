/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { TreeContext, TreeModel } from '@siemens/ix';
import { familyTreeData } from './dropdown-tree-family-data';

@Component({
  selector: 'app-example',
  styles: [
    `
      .container {
        width: 100%;
        height: 100vh;
        display: flex;
        padding: 1rem;
        justify-content: center;
        align-items: center;
      }

      .comparison-section {
        width: 50%;
        height: 100%;
        padding: 1rem;
      }

      .family-dropdown {
        width: 20rem;
        overflow: hidden;

        .treeContainer {
          height: 16rem;
        }
      }

      .multiselect-controls {
        display: flex;
        padding-top: 0.5rem;
        padding-bottom: 0.25rem;
      }

      .section-title {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .dropdown-row {
        margin: 0 1rem;
      }

      .label {
        margin-bottom: 0.5rem;
        color: var(--theme-color-std-text);
      }

      .multiselect-button {
        width: 100%;
        padding: 0 0.5rem;
      }

      .tree-item {
        display: flex;
        align-items: center;
      }

      .tree-item .checkbox {
        margin-right: 0.75rem;
      }

      .tree-item .radio {
        margin-right: 0.75rem;
      }

      .tree-label {
        color: var(--theme-color-std-text);
      }
    `,
  ],
  template: `
    <div class="container">
      <!-- IX Dropdown Button Section -->
      <div class="comparison-section">
        <h3 class="section-title">ix-dropdown-button</h3>

        <div class="dropdown-row">
          <label class="label">TreeDropdown</label>
          <ix-dropdown-button
            outline
            label="select tree elements"
            closeBehavior="outside"
            placement="bottom-end">
            <div class="family-dropdown">
              <div class="treeContainer">
                <ix-tree
                  root="root"
                  [model]="familyTree"
                  [context]="familyTreeContextIx"
                  [renderItem]="treeItemIx" />
              </div>
              <div class="multiselect-controls" *ngIf="multiselectIx">
                <ix-button class="multiselect-button" (click)="toggleMultiSelectIx()">
                  multi de-/select
                </ix-button>
              </div>
            </div>
          </ix-dropdown-button>
        </div>

        <ng-template #treeItemIx let-item>
          <div class="tree-item">
            <ix-checkbox
              *ngIf="item.isStep && multiselectIx"
              class="checkbox"
              [label]="item.name"
              [checked]="isSelectedPersonIx(item.id)"
              (checkedChange)="selectPersonIx(item.id, $event.detail)"/>
            <ix-radio
              *ngIf="item.isStep && !multiselectIx"
              class="radio"
              [label]="item.name"
              [checked]="isSelectedPersonIx(item.id)"
              (checkedChange)="selectPersonIx(item.id, $event.detail)"/>
            <label
              *ngIf="!item.isStep"
              class="tree-label">{{ item.name }}</label>
          </div>
        </ng-template>
      </div>

      <!-- IX Dropdown Section -->
      <div class="comparison-section">
        <h3 class="section-title">ix-dropdown</h3>

        <div class="dropdown-row">
          <label class="label">TreeDropdown</label>
          <ix-button #trigger outline>select tree elements</ix-button>
          <ix-dropdown
            [ixDropdownTrigger]="trigger"
            closeBehavior="outside"
            placement="bottom-end">
            <div class="family-dropdown">
              <div class="treeContainer">
                <ix-tree
                  root="root"
                  [model]="familyTree"
                  [context]="familyTreeContextRegular"
                  [renderItem]="treeItemRegular" />
              </div>
              <div class="multiselect-controls" *ngIf="multiselectRegular">
                <ix-button class="multiselect-button" (click)="toggleMultiSelectRegular()">
                  multi de-/select
                </ix-button>
              </div>
            </div>
          </ix-dropdown>
        </div>

        <ng-template #treeItemRegular let-item>
          <div class="tree-item">
            <ix-checkbox
              *ngIf="item.isStep && multiselectRegular"
              class="checkbox"
              [label]="item.name"
              [checked]="isSelectedPersonRegular(item.id)"
              (checkedChange)="selectPersonRegular(item.id, $event.detail)"/>
            <ix-radio
              *ngIf="item.isStep && !multiselectRegular"
              class="radio"
              [label]="item.name"
              [checked]="isSelectedPersonRegular(item.id)"
              (checkedChange)="selectPersonRegular(item.id, $event.detail)"/>
            <label
              *ngIf="!item.isStep"
              class="tree-label">{{ item.name }}</label>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export default class TreeInsideDropdown {
  protected familyTree: TreeModel<{
    id: string;
    name: string;
    isStep: boolean;
  }> = familyTreeData;

  protected familyTreeContextIx: TreeContext = {};
  protected familyTreeContextRegular: TreeContext = {};
  protected selectedPersonIx: string[] = [];
  protected selectedPersonRegular: string[] = [];
  protected multiselectIx: boolean = true;
  protected multiselectRegular: boolean = true;

  constructor() {
    // Initialize context for both dropdown types
    const contextTemplate: TreeContext = {};

    // Add root to context
    contextTemplate['root'] = { isExpanded: true, isSelected: false };

    // Add all parent nodes to context
    Object.keys(familyTreeData)
      .filter(
        (k) => familyTreeData[k].id !== 'root' && familyTreeData[k].hasChildren
      )
      .forEach((k) => (contextTemplate[k] = { isExpanded: true, isSelected: false }));

    this.familyTreeContextIx = { ...contextTemplate };
    this.familyTreeContextRegular = { ...contextTemplate };
  }

  // IX Dropdown Button methods
  protected selectPersonIx(id: string, checked: boolean): void {
    const index = this.selectedPersonIx.indexOf(id);

    if (checked && index < 0) {
      this.selectedPersonIx.push(id);
    } else if (!checked && index >= 0) {
      this.selectedPersonIx.splice(index, 1);
    }

    console.log('IX Selected persons:', this.selectedPersonIx);
  }

  protected isSelectedPersonIx(id: string): boolean {
    return this.selectedPersonIx.includes(id);
  }

  protected toggleMultiSelectIx(): void {
    this.multiselectIx = !this.multiselectIx;
    this.selectedPersonIx = [];
    console.log('IX Multiselect toggled:', this.multiselectIx);
  }

  // Regular IX Dropdown methods
  protected selectPersonRegular(id: string, checked: boolean): void {
    const index = this.selectedPersonRegular.indexOf(id);

    if (checked && index < 0) {
      this.selectedPersonRegular.push(id);
    } else if (!checked && index >= 0) {
      this.selectedPersonRegular.splice(index, 1);
    }

    console.log('Regular Selected persons:', this.selectedPersonRegular);
  }

  protected isSelectedPersonRegular(id: string): boolean {
    return this.selectedPersonRegular.includes(id);
  }

  protected toggleMultiSelectRegular(): void {
    this.multiselectRegular = !this.multiselectRegular;
    this.selectedPersonRegular = [];
    console.log('Regular Multiselect toggled:', this.multiselectRegular);
  }
}

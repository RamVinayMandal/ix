/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import {
  IxButton,
  IxDropdown,
  IxDropdownHeader,
  IxDivider,
  IxDropdownTriggerDirective,
  IxTree,
  IxIcon,
} from '@siemens/ix-angular/standalone';
import { TreeContext, TreeModel } from '@siemens/ix';

type TreeData = {
  name: string;
  icon: string;
};

@Component({
  standalone: true,
  selector: 'app-example',
  imports: [
    IxButton,
    IxDropdown,
    IxDropdownHeader,
    IxDivider,
    IxDropdownTriggerDirective,
    IxTree,
    IxIcon,
  ],
  styles: [
    `
      .dropdown-tree-container {
        min-height: 200px;
        min-width: 250px;
        max-height: 300px;
        overflow-y: auto;
        padding: 0.5rem;
      }

      .tree-item {
        display: flex;
        align-items: center;
      }

      .tree-item ix-icon {
        margin-inline-end: 0.5rem;
      }
    `,
  ],
  template: `
    <ix-button #trigger>Select from Tree</ix-button>
    <ix-dropdown [ixDropdownTrigger]="trigger" placement="bottom-start">
      <ix-dropdown-header label="Select Item"></ix-dropdown-header>
      <ix-divider></ix-divider>
      <div class="dropdown-tree-container">
        <ix-tree
          root="root"
          [model]="model"
          [context]="context"
          [renderItem]="treeItem"
          (nodeClicked)="onNodeClicked($event.detail)"
        ></ix-tree>
      </div>
    </ix-dropdown>

    <ng-template #treeItem let-item>
      <div class="tree-item">
        <ix-icon [name]="item.icon" size="16"></ix-icon>
        {{ item.name }}
      </div>
    </ng-template>
  `,
})
export default class DropdownTree {
  context: TreeContext = {};
  model: TreeModel<TreeData> = {
    root: {
      id: 'root',
      data: {
        icon: '',
        name: '',
      },
      hasChildren: true,
      children: ['documents', 'settings', 'projects'],
    },
    documents: {
      id: 'documents',
      data: {
        name: 'Documents',
        icon: 'folder',
      },
      hasChildren: true,
      children: ['doc1', 'doc2', 'doc3'],
    },
    doc1: {
      id: 'doc1',
      data: {
        name: 'Report.pdf',
        icon: 'document',
      },
      hasChildren: false,
      children: [],
    },
    doc2: {
      id: 'doc2',
      data: {
        name: 'Presentation.pptx',
        icon: 'document',
      },
      hasChildren: false,
      children: [],
    },
    doc3: {
      id: 'doc3',
      data: {
        name: 'Spreadsheet.xlsx',
        icon: 'document',
      },
      hasChildren: false,
      children: [],
    },
    settings: {
      id: 'settings',
      data: {
        name: 'Settings',
        icon: 'settings',
      },
      hasChildren: true,
      children: ['general', 'security', 'notifications'],
    },
    general: {
      id: 'general',
      data: {
        name: 'General',
        icon: 'settings',
      },
      hasChildren: false,
      children: [],
    },
    security: {
      id: 'security',
      data: {
        name: 'Security',
        icon: 'shield',
      },
      hasChildren: false,
      children: [],
    },
    notifications: {
      id: 'notifications',
      data: {
        name: 'Notifications',
        icon: 'bell',
      },
      hasChildren: false,
      children: [],
    },
    projects: {
      id: 'projects',
      data: {
        name: 'Projects',
        icon: 'star',
      },
      hasChildren: true,
      children: ['project1', 'project2'],
    },
    project1: {
      id: 'project1',
      data: {
        name: 'Project Alpha',
        icon: 'bulb',
      },
      hasChildren: false,
      children: [],
    },
    project2: {
      id: 'project2',
      data: {
        name: 'Project Beta',
        icon: 'bulb',
      },
      hasChildren: false,
      children: [],
    },
  };

  constructor() {
    // Initialize context with default expanded state for demonstration
    this.context = {
      root: { isExpanded: true, isSelected: false },
      documents: { isExpanded: true, isSelected: false },
      settings: { isExpanded: false, isSelected: false },
      projects: { isExpanded: false, isSelected: false },
      doc1: { isExpanded: false, isSelected: false },
      doc2: { isExpanded: false, isSelected: false },
      doc3: { isExpanded: false, isSelected: false },
      general: { isExpanded: false, isSelected: false },
      security: { isExpanded: false, isSelected: false },
      notifications: { isExpanded: false, isSelected: false },
      project1: { isExpanded: false, isSelected: false },
      project2: { isExpanded: false, isSelected: false },
    };
  }

  onNodeClicked(nodeId: string) {
    console.log('Tree node clicked:', nodeId);

    // Reset all selections
    Object.keys(this.context).forEach(key => {
      this.context[key].isSelected = false;
    });

    // Select the clicked node
    if (this.context[nodeId]) {
      this.context[nodeId].isSelected = true;
    }

    // Log the selected item data
    const selectedItem = this.model[nodeId];
    if (selectedItem) {
      console.log('Selected item:', selectedItem.data);
    }
  }
}

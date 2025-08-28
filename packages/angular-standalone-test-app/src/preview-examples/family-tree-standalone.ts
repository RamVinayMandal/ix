/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IxButton,
  IxTree,
  IxIcon,
} from '@siemens/ix-angular/standalone';
import { TreeContext, TreeModel } from '@siemens/ix';
import { familyTreeData } from './dropdown-tree-family-data';

type FamilyMember = {
  id: string;
  name: string;
};

@Component({
  standalone: true,
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IxButton,
    IxTree,
    IxIcon,
  ],
  styles: [
    `
      .container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .header {
        margin-bottom: 2rem;
      }

      .title {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: var(--theme-color-std-text);
      }

      .description {
        color: var(--theme-color-soft-text);
        margin-bottom: 1.5rem;
      }

      .tree-section {
        display: flex;
        gap: 2rem;
      }

      .tree-container {
        flex: 1;
        padding: 1rem;
        min-height: 500px;
      }

      .tree-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--theme-color-neutral-20);
      }

      .tree-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--theme-color-std-text);
      }

      .tree-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }

      .tree-item:hover {
        background-color: var(--theme-btn-invisible--hover--background);
      }

      .item-content {
        display: flex;
        align-items: center;
        flex: 1;
      }

      .item-name {
        margin-left: 0.5rem;
      }

      .item-actions {
        display: flex;
        gap: 0.25rem;
        opacity: 0;
        transition: opacity 0.2s ease;
        margin-left: auto;
      }

      .tree-item:hover .item-actions {
        opacity: 1;
      }
    `,
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1 class="title">Interactive Tree - Standalone</h1>
        <p class="description">
          A standalone ix-tree implementation with add and remove functionality for family members.
          Demonstrates dynamic tree manipulation with icons and actions.
        </p>
      </div>

      <div class="tree-section">
        <div class="tree-container">
          <div class="tree-header">
            <h2 class="tree-title">Family Tree</h2>
            <ix-button
              variant="primary"
              size="small"
              icon="add"
              (click)="expandAll()">
              Expand All
            </ix-button>
          </div>

          <ix-tree
            [model]="treeModel"
            [context]="treeContext"
            [renderItem]="treeItemTemplate">
          </ix-tree>

          <ng-template #treeItemTemplate let-item>
            <div class="tree-item">
              <div class="item-content">
                <ix-icon
                  [name]="getItemIcon(item)"
                  size="16">
                </ix-icon>
                <span class="item-name">{{ item.name }}</span>
              </div>
              <div class="item-actions" *ngIf="item.id !== 'root'">
                <ix-button
                  variant="ghost"
                  size="small"
                  (click)="addChild(item)"
                  title="Add item">
                  <ix-icon name="add" size="24"></ix-icon>
                </ix-button>
                <ix-button
                  variant="ghost"
                  size="small"
                  (click)="removeItem(item)"
                  title="Remove item">
                  <ix-icon name="trashcan" size="24"></ix-icon>
                </ix-button>
              </div>
            </div>
          </ng-template>
        </div>

      </div>
    </div>
  `,
})
export default class FamilyTreeStandalone {
  protected treeModel: TreeModel<FamilyMember> = {};
  protected treeContext: TreeContext = {};
  private nextId: number = 1000;
  private readonly INITIAL_TREE_DATA = familyTreeData;

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.resetTree();
  }

  private initializeTreeContext(): void {
    this.treeContext = {
      root: { isExpanded: true, isSelected: false },
      okyf5mep: { isExpanded: true, isSelected: false },
      gmabznu: { isExpanded: true, isSelected: false },
      jc0ohr4t: { isExpanded: true, isSelected: false },
      wil78kp3: { isExpanded: true, isSelected: false },
      zxc45bnm: { isExpanded: true, isSelected: false },
      qwe98rty: { isExpanded: true, isSelected: false },
    };
  }

  protected resetTree(): void {
    this.treeModel = JSON.parse(JSON.stringify(this.INITIAL_TREE_DATA));
    this.initializeTreeContext();
    this.nextId = 1000;
    this.cdr.markForCheck();
  }

  protected expandAll(): void {
    const newContext: TreeContext = {};
    Object.keys(this.treeModel).forEach(key => {
      if (this.treeModel[key].hasChildren) {
        newContext[key] = { isExpanded: true, isSelected: false };
      }
    });
    this.treeContext = newContext;
    this.cdr.markForCheck();
  }

  protected addChild(parentItem: FamilyMember): void {
    if (!parentItem.id) return;

    const memberName = prompt(`Enter name for new child of ${parentItem.name}:`);
    if (!memberName?.trim()) return;

    this.addMemberToTree(memberName.trim(), parentItem.id);
  }

  protected removeItem(item: FamilyMember): void {
    if (!item.id || item.id === 'root') return;

    if (confirm(`Are you sure you want to remove ${item.name} and all descendants?`)) {
      this.removeMemberFromTree(item.id);
    }
  }

  private addMemberToTree(name: string, parentId: string): void {
    const newId = `member_${this.nextId++}`;

    // Create a copy of the current model
    const newTreeModel = { ...this.treeModel };

    // Add the new member to the model
    newTreeModel[newId] = {
      id: newId,
      hasChildren: false,
      children: [],
      data: {
        id: newId,
        name: name
      }
    };

    // Add to parent's children - create new parent object
    if (newTreeModel[parentId]) {
      newTreeModel[parentId] = {
        ...newTreeModel[parentId],
        children: [...newTreeModel[parentId].children, newId],
        hasChildren: true
      };
    }

    // Update model first
    this.treeModel = newTreeModel;

    // Force change detection
    this.cdr.detectChanges();

    // Then update context to expand parent
    this.treeContext = {
      ...this.treeContext,
      [parentId]: {
        isExpanded: true,
        isSelected: false
      }
    };

    // Force another change detection
    this.cdr.detectChanges();
  }

  private removeMemberFromTree(memberId: string): void {
    // Create copies for immutable updates
    const newTreeModel = { ...this.treeModel };
    const newTreeContext = { ...this.treeContext };

    // Remove from parent's children array
    Object.keys(newTreeModel).forEach(key => {
      const node = newTreeModel[key];
      const childIndex = node.children.indexOf(memberId);
      if (childIndex > -1) {
        // Create new parent node with updated children
        newTreeModel[key] = {
          ...node,
          children: node.children.filter(childId => childId !== memberId),
          hasChildren: node.children.filter(childId => childId !== memberId).length > 0
        };
      }
    });

    // Remove the member and all descendants
    this.removeNodeAndDescendants(memberId, newTreeModel, newTreeContext);

    // Assign new references to trigger change detection
    this.treeModel = newTreeModel;
    this.cdr.detectChanges();

    this.treeContext = newTreeContext;
    this.cdr.detectChanges();
  }

  private removeNodeAndDescendants(nodeId: string, treeModel: TreeModel<FamilyMember> = this.treeModel, treeContext: TreeContext = this.treeContext): void {
    if (treeModel[nodeId]) {
      // Remove all children first
      [...treeModel[nodeId].children].forEach(childId => {
        this.removeNodeAndDescendants(childId, treeModel, treeContext);
      });

      // Remove the node itself
      delete treeModel[nodeId];
      delete treeContext[nodeId];
    }
  }

  protected getItemIcon(item: FamilyMember): string {
    if (item.id === 'root') return 'home';
    return 'user';
  }

  protected getTotalMembers(): number {
    return Object.keys(this.treeModel).length - 1; // Exclude root
  }

  protected getBiologicalCount(): number {
    return Object.values(this.treeModel)
      .filter(node => node.data.id !== 'root')
      .length;
  }
}

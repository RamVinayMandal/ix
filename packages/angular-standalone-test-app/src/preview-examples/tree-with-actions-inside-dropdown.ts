/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IxButton,
  IxDropdownButton,
  IxTree,
  IxIcon,
} from '@siemens/ix-angular/standalone';
import { TreeContext, TreeModel } from '@siemens/ix';
import { familyTreeData } from './dropdown-tree-family-data';

type FamilyMember = {
  id: string;
  name: string;
};

// Create a cached reference to initial data for performance
const INITIAL_TREE_DATA = familyTreeData;

@Component({
  standalone: true,
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IxButton,
    IxDropdownButton,
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

      .main-section {
        display: flex;
        gap: 2rem;
      }

      .dropdown-section {
        flex: 1;
      }

      .dropdown-label {
        margin-bottom: 1rem;
        font-weight: 600;
        color: var(--theme-color-std-text);
      }

      .tree-dropdown {
        width: 100%;
        max-width: 480px;
      }

      .tree-dropdown::part(button) {
        min-width: 250px;
      }

      .family-dropdown {
        width: 30rem;
        overflow: hidden;
      }

      .treeContainer {
        height: 20rem;
      }

      .tree-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 1rem 1rem 0.5rem 1rem;
        border-bottom: 1px solid var(--theme-color-neutral-20);
      }

      .tree-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--theme-color-std-text);
      }

      .tree-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.375rem 0.75rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        margin-bottom: 0.25rem;
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
        margin-left: 0.75rem;
        font-weight: 500;
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
        <h1 class="title">Interactive Family Tree in Dropdown</h1>
        <p class="description">
          An ix-tree implementation inside an ix-dropdown with full add and remove functionality.
          Demonstrates dynamic tree manipulation within a dropdown container.
        </p>
      </div>

      <div class="main-section">
        <div class="dropdown-section">
          <div class="dropdown-label">Family Tree Browser:</div>
          <ix-dropdown-button
            outline
            label="Family Tree"
            closeBehavior="outside"
            placement="bottom-start"
            class="tree-dropdown">
            <div class="family-dropdown">
              <div class="tree-header">
                <span class="tree-title">Family Members</span>
              </div>
              <div class="treeContainer">
                <ix-tree
                  [model]="treeModel"
                  [context]="treeContext"
                  [renderItem]="treeItemTemplate"
                  (nodeToggled)="onNodeToggled($event)"
                  (selectionChanged)="onSelectionChanged($event)">
                </ix-tree>
              </div>
            </div>

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
                    title="Add child member">
                    <ix-icon name="add" size="14"></ix-icon>
                  </ix-button>
                  <ix-button
                    variant="ghost"
                    size="small"
                    (click)="removeItem(item)"
                    title="Remove member">
                    <ix-icon name="trashcan" size="14"></ix-icon>
                  </ix-button>
                </div>
              </div>
            </ng-template>
          </ix-dropdown-button>
        </div>
      </div>
    </div>
  `,
})
export default class TreeWithActionsInsideDropdown implements OnDestroy {
  protected treeModel: TreeModel<FamilyMember> = {};
  protected treeContext: TreeContext = {};
  private nextId: number = 1000;

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.resetTree();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
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
    this.treeModel = JSON.parse(JSON.stringify(INITIAL_TREE_DATA));
    this.initializeTreeContext();
    this.nextId = 1000;
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

    const descendantCount = this.getDescendantCount(item.id);
    const message = descendantCount > 0
      ? `Remove ${item.name} and ${descendantCount} descendant(s)?`
      : `Remove ${item.name}?`;

    if (confirm(message)) {
      this.removeMemberFromTree(item.id);
    }
  }

  private addMemberToTree(name: string, parentId: string): void {
    const newId = `member_${this.nextId++}`;

    // Create new tree model with immutable updates
    const newTreeModel = { ...this.treeModel };

    // Add the new member
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

  private getDescendantCount(nodeId: string): number {
    let count = 0;
    if (this.treeModel[nodeId]) {
      for (const childId of this.treeModel[nodeId].children) {
        count += 1 + this.getDescendantCount(childId);
      }
    }
    return count;
  }

  protected getItemIcon(item: FamilyMember): string {
    if (item.id === 'root') return 'home';
    return 'user';
  }

  protected onNodeToggled(event: any): void {
    console.log('Node toggled:', event);
  }

  protected onSelectionChanged(event: any): void {
    console.log('Selection changed:', event);
  }
}

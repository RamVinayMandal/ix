/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TreeContext, TreeModel } from '@siemens/ix';
import { familyTreeData } from './dropdown-tree-family-data';

type FamilyMember = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

      .filter-section {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--theme-color-soft-bg);
        border-radius: var(--theme-default-border-radius);
      }

      .filter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .filter-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--theme-color-std-text);
      }

      .filter-controls {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
      }

      .filter-input {
        flex: 1;
        min-width: 200px;
      }

      .filter-stats {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--theme-color-weak-text);
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

      .tree-item.filtered-match {
        background-color: var(--theme-color-primary-10);
      }

      .item-content {
        display: flex;
        align-items: center;
        flex: 1;
      }

      .item-name {
        margin-left: 0.5rem;
      }

      .item-name.highlight {
        font-weight: 600;
        color: var(--theme-color-primary);
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

      .no-results {
        text-align: center;
        padding: 2rem;
        color: var(--theme-color-weak-text);
        font-style: italic;
      }

      .controls-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
    `,
  ],
  template: `
    <div class="container">
      <div class="header">
        <!-- <h1 class="title">Filterable Interactive Tree</h1>
        <p class="description">
          An interactive family tree with filtering capabilities. Search for family members by name,
          add or remove members, and see real-time filtering results.
        </p> -->
      </div>

      <div class="tree-section">
        <div class="tree-container">
          <div class="filter-section">
            <div class="filter-header">
              <span class="filter-title">Tree Filtering</span>
              <div class="controls-row">
                <ix-button
                  variant="ghost"
                  size="small"
                  (click)="clearFilter()"
                  [disabled]="!filterText">
                  Clear
                </ix-button>
                <ix-button
                  variant="secondary"
                  size="small"
                  (click)="expandAll()">
                  Expand All
                </ix-button>
              </div>
            </div>
            <div class="filter-controls">
              <ix-input
                class="filter-input"
                placeholder="Search family members..."
                [value]="filterText"
                (valueChange)="onFilterChange($event.detail)"
                (input)="onFilterInput($event)">
              </ix-input>
            </div>
            <div class="filter-stats" *ngIf="filterText">
              {{ getFilterStats() }}
            </div>
          </div>

          <!-- <div class="tree-header">
            <h2 class="tree-title">Interactive Tree</h2>
          </div> -->

          <!-- <div style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--theme-color-weak-text);">
            Debug: Filtered model has {{ getFilteredModelCount() }} nodes
          </div> -->

          <ix-tree
            root="root"
            [model]="filteredTreeModel"
            [context]="treeContext"
            [renderItem]="treeItemTemplate">
          </ix-tree>

          <div class="no-results" *ngIf="filterText && !hasFilteredResults()">
            No tree items match "{{ filterText }}"
          </div>

          <ng-template #treeItemTemplate let-item>
            <div class="tree-item" [class.filtered-match]="isFilterMatch(item)">
              <div class="item-content">
                <ix-icon
                  [name]="getItemIcon(item)"
                  size="16">
                </ix-icon>
                <span class="item-name" [class.highlight]="isFilterMatch(item)">
                  {{ getHighlightedName(item) }}
                </span>
              </div>
              <div class="item-actions" *ngIf="item.id !== 'root'">
                <ix-button
                  variant="ghost"
                  size="small"
                  (click)="addChild(item)"
                  title="Add child">
                  <ix-icon name="add" size="24"></ix-icon>
                </ix-button>
                <ix-button
                  variant="ghost"
                  size="small"
                  (click)="removeItem(item)"
                  title="Remove member">
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
export default class TreeWithActions {
  protected treeModel: TreeModel<FamilyMember> = {};
  protected filteredTreeModel: TreeModel<FamilyMember> = {};
  protected treeContext: TreeContext = {};
  protected filterText: string = '';
  private nextId: number = 1000;
  private readonly INITIAL_TREE_DATA = familyTreeData;
  private filteredMatches: Set<string> = new Set();

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
    this.applyFilter();
    this.initializeTreeContext();
    this.nextId = 1000;
    this.cdr.markForCheck();
  }

  protected expandAll(): void {
    const newContext: TreeContext = {};
    Object.keys(this.filteredTreeModel).forEach(key => {
      if (this.filteredTreeModel[key].hasChildren) {
        newContext[key] = { isExpanded: true, isSelected: false };
      }
    });
    this.treeContext = newContext;
    this.cdr.markForCheck();
  }

  protected onFilterInput(event: any): void {
    this.filterText = event.target.value;
    this.onFilterChange(this.filterText);
  }

  protected onFilterChange(value: string): void {
    this.filterText = value;
    this.applyFilter();
    this.cdr.markForCheck();
  }

  protected clearFilter(): void {
    this.filterText = '';
    this.applyFilter();
    this.cdr.markForCheck();
  }

  private applyFilter(): void {
    if (!this.filterText.trim()) {
      this.filteredTreeModel = { ...this.treeModel };
      this.filteredMatches.clear();
      return;
    }

    const filterLower = this.filterText.toLowerCase();
    this.filteredMatches.clear();

    // Find all matching nodes
    const matchingNodes = new Set<string>();

    // Always include root
    matchingNodes.add('root');

    Object.keys(this.treeModel).forEach(nodeId => {
      const node = this.treeModel[nodeId];
      if (node.data && node.data.name.toLowerCase().includes(filterLower)) {
        matchingNodes.add(nodeId);
        this.filteredMatches.add(nodeId);

        // Include all ancestors
        this.addAncestors(nodeId, matchingNodes);

        // Include all descendants
        this.addDescendants(nodeId, matchingNodes);
      }
    });

    // Build filtered tree model
    this.filteredTreeModel = {};
    matchingNodes.forEach(nodeId => {
      if (this.treeModel[nodeId]) {
        this.filteredTreeModel[nodeId] = {
          ...this.treeModel[nodeId],
          children: this.treeModel[nodeId].children.filter(childId => matchingNodes.has(childId))
        };
      }
    });

    // Update context to expand filtered branches
    this.updateFilteredContext(matchingNodes);
  }

  private addAncestors(nodeId: string, matchingNodes: Set<string>): void {
    Object.keys(this.treeModel).forEach(parentId => {
      const parent = this.treeModel[parentId];
      if (parent.children.includes(nodeId)) {
        matchingNodes.add(parentId);
        this.addAncestors(parentId, matchingNodes);
      }
    });
  }

  private addDescendants(nodeId: string, matchingNodes: Set<string>): void {
    const node = this.treeModel[nodeId];
    if (node) {
      node.children.forEach(childId => {
        matchingNodes.add(childId);
        this.addDescendants(childId, matchingNodes);
      });
    }
  }

  private updateFilteredContext(matchingNodes: Set<string>): void {
    const newContext: TreeContext = {};
    matchingNodes.forEach(nodeId => {
      if (this.treeModel[nodeId] && this.treeModel[nodeId].hasChildren) {
        newContext[nodeId] = { isExpanded: true, isSelected: false };
      }
    });
    this.treeContext = newContext;
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

    // Add to parent's children
    if (newTreeModel[parentId]) {
      newTreeModel[parentId] = {
        ...newTreeModel[parentId],
        children: [...newTreeModel[parentId].children, newId],
        hasChildren: true
      };
    }

    // Update model and apply filter
    this.treeModel = newTreeModel;
    this.applyFilter();

    // Update context to expand parent
    this.treeContext = {
      ...this.treeContext,
      [parentId]: {
        isExpanded: true,
        isSelected: false
      }
    };

    this.cdr.detectChanges();
  }

  private removeMemberFromTree(memberId: string): void {
    const newTreeModel = { ...this.treeModel };
    const newTreeContext = { ...this.treeContext };

    // Remove from parent's children array
    Object.keys(newTreeModel).forEach(key => {
      const node = newTreeModel[key];
      const childIndex = node.children.indexOf(memberId);
      if (childIndex > -1) {
        newTreeModel[key] = {
          ...node,
          children: node.children.filter(childId => childId !== memberId),
          hasChildren: node.children.filter(childId => childId !== memberId).length > 0
        };
      }
    });

    // Remove the member and descendants
    this.removeNodeAndDescendants(memberId, newTreeModel, newTreeContext);

    this.treeModel = newTreeModel;
    this.applyFilter();
    this.treeContext = newTreeContext;
    this.cdr.detectChanges();
  }

  private removeNodeAndDescendants(nodeId: string, treeModel: TreeModel<FamilyMember>, treeContext: TreeContext): void {
    if (treeModel[nodeId]) {
      [...treeModel[nodeId].children].forEach(childId => {
        this.removeNodeAndDescendants(childId, treeModel, treeContext);
      });

      delete treeModel[nodeId];
      delete treeContext[nodeId];
    }
  }

  protected getItemIcon(item: FamilyMember): string {
    if (item.id === 'root') return 'home';
    return 'user';
  }

  protected isFilterMatch(item: FamilyMember): boolean {
    return this.filteredMatches.has(item.id);
  }

  protected getHighlightedName(item: FamilyMember): string {
    return item.name; // Could implement HTML highlighting here if needed
  }

  protected hasFilteredResults(): boolean {
    return Object.keys(this.filteredTreeModel).length > 1; // More than just root
  }

  protected getFilterStats(): string {
    const matchCount = this.filteredMatches.size;
    const totalCount = Object.keys(this.treeModel).length - 1; // Exclude root

    if (matchCount === 0) {
      return 'No matches found';
    } else if (matchCount === 1) {
      return '1 item found';
    } else {
      return `${matchCount} items found (${totalCount} total)`;
    }
  }

  protected getTotalMembers(): number {
    return Object.keys(this.treeModel).length - 1; // Exclude root
  }

  /* protected getFilteredModelCount(): number {
    return Object.keys(this.filteredTreeModel).length;
  } */
}

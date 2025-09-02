/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TreeContext, TreeModel } from '@siemens/ix';
import { familyTreeData } from './dropdown-tree-family-data';

type FamilyMember = {
  id: string;
  name: string;
};

type RemovedSubtree = {
  rootItem: FamilyMember;
  originalRootId: string;
  originalParentId: string;
  subtreeModel: TreeModel<FamilyMember>;
  subtreeContext: TreeContext;
};

const INITIAL_TREE_DATA = familyTreeData;

@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 1rem;
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
        align-items: flex-start;
      }

      .tree-section {
        flex: 0 0 auto;
        min-width: 480px;
      }

      .controls-container {
        flex: 1;
        min-width: 600px;
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
        height: 40rem;
        overflow-y: auto;
        scroll-behavior: smooth;
      }

      .tree-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 1rem 1rem 0.5rem 1rem;
        border-bottom: 1px solid var(--theme-color-neutral-20);
      }

      .header-actions {
        display: flex;
        gap: 0.25rem;
        align-items: center;
      }

      .filter-section {
        padding: 0 1rem 1rem 1rem;
        margin-bottom: 0.5rem;
      }

      .filter-stats {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--theme-color-weak-text);
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

      .tree-item.filtered-match {
        background-color: var(--theme-color-primary-10);
      }

      .tree-item.newly-added {
        background-color: var(--theme-color-success-10) !important;
        border: 2px solid var(--theme-color-success) !important;
        animation: addedItemPulse 2s ease-in-out infinite;
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(0, 255, 0, 0.15);
      }

      @keyframes addedItemPulse {
        0%, 100% {
          background-color: var(--theme-color-success-10);
          border-color: var(--theme-color-success);
        }
        50% {
          background-color: var(--theme-color-success-20);
          border-color: var(--theme-color-success-hover);
        }
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

      .item-name.highlight {
        font-weight: 600;
        color: var(--theme-color-primary);
      }

      .item-name.removal-message {
        font-weight: 600;
        color: var(--theme-color-alarm);
        font-style: italic;
        animation: removalPulse 1s infinite;
      }

      @keyframes removalPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      .no-results {
        text-align: center;
        padding: 2rem 1rem;
        color: var(--theme-color-weak-text);
        font-style: italic;
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

      .external-controls {
        padding: 1.5rem;
        background: var(--theme-color-soft-bg);
        border-radius: var(--theme-default-border-radius);
        border: 1px solid var(--theme-color-neutral-20);
        display: flex;
        flex-direction: column;
        gap: 2rem;
        height: fit-content;
      }

      .controls-section {
        flex: 1;
      }

      .auto-demo-section {
        flex: 1;
        margin-top: 0;
        padding: 1rem;
        background: var(--theme-color-neutral-10);
        border: 2px solid var(--theme-color-neutral-40);
        border-radius: var(--theme-default-border-radius);
      }

      .controls-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--theme-color-std-text);
      }

      .controls-row {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }

      .controls-row:last-child {
        margin-bottom: 0;
      }

      .control-group {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .control-input {
        min-width: 200px;
      }

      .status-display {
        margin-top: 1rem;
        padding: 0.75rem;
        background: var(--theme-color-neutral-10);
        border-radius: 4px;
        font-size: 0.875rem;
        color: var(--theme-color-weak-text);
      }

      .common-status-section {
        padding: 1rem;
        background: var(--theme-color-primary-5);
        border-radius: var(--theme-default-border-radius);
        border: 1px solid var(--theme-color-primary-20);
      }

      .status-section-title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--theme-color-std-text);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .removed-items {
        margin-top: 1rem;
      }

      .removed-items-title {
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--theme-color-std-text);
      }

      .removed-item {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0.25rem 0.5rem 0.25rem 0;
        padding: 0.25rem 0.75rem;
        background: var(--theme-color-neutral-20);
        border-radius: 12px;
        font-size: 0.875rem;
      }

      .removed-item-name {
        color: var(--theme-color-std-text);
      }

      .restore-btn {
        cursor: pointer;
        color: var(--theme-color-primary);
      }

      .restore-btn:hover {
        color: var(--theme-color-primary-hover);
      }

      .restore-btn.restoring {
        color: var(--theme-color-weak-text);
        cursor: not-allowed;
        opacity: 0.5;
      }

      .restore-btn.demo-disabled {
        color: var(--theme-color-weak-text);
        cursor: not-allowed;
        opacity: 0.5;
      }

      /* Disabled button styles for demo mode */
      ix-button[disabled] {
        cursor: not-allowed !important;
        pointer-events: auto !important;
        opacity: 0.6 !important;
      }

      ix-button[disabled]:hover {
        cursor: not-allowed !important;
      }

      .auto-demo-section {
        flex: 1;
        margin-top: 0;
        padding: 1rem;
        background: var(--theme-color-neutral-10);
        border: 2px solid var(--theme-color-neutral-40);
        border-radius: var(--theme-default-border-radius);
      }

      .section-title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--theme-color-std-text);
      }

      .auto-demo-title {
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--theme-color-std-text);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .demo-controls {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .demo-status {
        padding: 0.75rem;
        background: var(--theme-color-neutral-5);
        border-radius: 4px;
        border-left: 4px solid var(--theme-color-primary);
        font-family: monospace;
        font-size: 0.9rem;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .demo-status.active {
        background: var(--theme-color-primary-10);
        border-left-color: var(--theme-color-primary);
        animation: pulse 1s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .countdown-display {
        font-weight: bold;
        color: var(--theme-color-primary);
        font-size: 1.1em;
      }

      .demo-main-message {
        min-height: 24px;
        margin-bottom: 0.5rem;
      }

      .demo-tip-message {
        min-height: 18px;
        display: flex;
        align-items: center;
      }

      .demo-tip-message small {
        line-height: 1.2;
      }
    `,
  ],
  template: `
    <div class="container">
      <div class="header">
        <!-- <h1 class="title">Filterable Family Tree in Dropdown</h1>
        <p class="description">
          An ix-tree implementation inside an ix-dropdown with filtering, add and remove functionality.
          Search for family members in real-time and manage the tree structure within the dropdown.
        </p> -->
      </div>

      <div class="main-section">
        <!-- Tree Section (Left Side) -->
        <div class="tree-section">
          <div class="dropdown-label">Tree Browser:</div>
          <ix-dropdown-button
            outline
            [label]="getDropdownLabel()"
            closeBehavior="outside"
            placement="bottom-start"
            class="tree-dropdown"
            #treeDropdown>
            <div class="family-dropdown">
              <div class="tree-header">
                <span class="tree-title">
                  Tree filtering
                  <span *ngIf="isAutoDemoRunning" style="color: var(--theme-color-primary); font-size: 0.9em;"> (Demo Active)</span>
                </span>
                <div class="header-actions">
                  <ix-button
                    variant="ghost"
                    size="small"
                    (click)="clearFilter()"
                    [disabled]="!filterText"
                    title="Clear filter">
                    <ix-icon name="refresh" size="16"></ix-icon>
                  </ix-button>
                  <ix-button
                    variant="ghost"
                    size="small"
                    (click)="expandAll()"
                    title="Expand all">
                    <ix-icon name="folder-expand-all" size="16"></ix-icon>
                  </ix-button>
                </div>
              </div>
              <div class="filter-section">
                <ix-input
                  placeholder="Search family members..."
                  [value]="filterText"
                  (valueChange)="onFilterChange($event.detail)"
                  (input)="onFilterInput($event)">
                </ix-input>
                <div class="filter-stats" *ngIf="filterText">
                  {{ getFilterStats() }}
                </div>
              </div>
              <div class="treeContainer" #treeContainer>
                <ix-tree
                  root="root"
                  [model]="filteredTreeModel"
                  [context]="treeContext"
                  [renderItem]="treeItemTemplate"
                  (nodeToggled)="onNodeToggled($event)"
                  (selectionChanged)="onSelectionChanged($event)">
                </ix-tree>
                <div class="no-results" *ngIf="filterText && !hasFilteredResults()">
                  No family members match "{{ filterText }}"
                </div>
              </div>
            </div>

            <ng-template #treeItemTemplate let-item>
              <div class="tree-item"
                   [class.filtered-match]="isFilterMatch(item)"
                   [class.newly-added]="isNewlyAdded(item)"
                   [attr.data-item-id]="item.id">
                <div class="item-content">
                  <ix-icon
                    [name]="getItemIcon(item)"
                    size="16">
                  </ix-icon>
                  <span class="item-name"
                        [class.highlight]="isFilterMatch(item)"
                        [class.removal-message]="isShowingRemovalMessage(item)">
                    {{ isShowingRemovalMessage(item) ? removalMessage : item.name }}
                  </span>
                </div>
                <div class="item-actions" *ngIf="item.id !== 'root'">
                  <ix-button
                    variant="ghost"
                    size="small"
                    (click)="addChild(item)"
                    [disabled]="isAutoDemoRunning"
                    title="Add child member">
                    <ix-icon name="add" size="14"></ix-icon>
                  </ix-button>
                  <ix-button
                    variant="ghost"
                    size="small"
                    (click)="removeItem(item)"
                    [disabled]="isAutoDemoRunning"
                    title="Remove member">
                    <ix-icon name="trashcan" size="14"></ix-icon>
                  </ix-button>
                </div>
              </div>
            </ng-template>
          </ix-dropdown-button>
        </div>

        <!-- Controls Section (Right Side) -->
        <div class="controls-container">
          <div class="external-controls">
            <!-- Manual Controls Section -->
            <div class="controls-section">
              <div class="section-title">Manual Controls</div>

              <div class="controls-row">
                <div class="control-group">
                  <ix-input
                    class="control-input"
                    placeholder="Enter member name to add to root..."
                    [value]="newMemberName"
                    (valueChange)="newMemberName = $event.detail">
                  </ix-input>
                  <ix-button
                    variant="primary"
                    (click)="addMemberToRootProgrammatically()"
                    [disabled]="!newMemberName.trim() || isAutoDemoRunning">
                    Add to root
                  </ix-button>
                </div>
              </div>

              <div class="controls-row">
                <div class="control-group">
                  <ix-button
                    variant="secondary"
                    (click)="removeRandomMemberProgrammatically()"
                    [disabled]="isAutoDemoRunning">
                    Remove random member
                  </ix-button>
                  <ix-button
                    variant="outline"
                    (click)="resetTreeProgrammatically()"
                    [disabled]="isAutoDemoRunning">
                    Reset tree
                  </ix-button>
                </div>
              </div>
            </div>

            <!-- Auto Demo Section -->
            <div class="auto-demo-section">
              <div class="auto-demo-title">
                <ix-icon name="circle-play" size="20"></ix-icon>
                Auto Demo Mode
              </div>
              <div class="demo-controls">
                <ix-button
                  variant="primary"
                  size="small"
                  (click)="startAutoDemo()"
                  [disabled]="isAutoDemoRunning">
                  Start demo
                </ix-button>
                <ix-button
                  variant="secondary"
                  size="small"
                  (click)="stopAutoDemo()"
                  [disabled]="!isAutoDemoRunning">
                  Stop demo
                </ix-button>
              </div>
              <div class="demo-status" [class.active]="isAutoDemoRunning">
                <div class="demo-main-message">
                  <div *ngIf="!isAutoDemoRunning">
                    Demo stopped. Click "Start demo" to begin automated testing.
                  </div>
                  <div *ngIf="isAutoDemoRunning && currentDemoAction">
                    {{ currentDemoAction }}
                    <span class="countdown-display" *ngIf="countdown > 0">{{ countdown }}s</span>
                  </div>
                  <div *ngIf="isAutoDemoRunning && !currentDemoAction">
                    Preparing next action...
                  </div>
                </div>
                <div class="demo-tip-message">
                  <small *ngIf="isAutoDemoRunning">📺 <strong>Keep dropdown open</strong> to watch the tree changes!</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Common Status Section -->
          <div class="common-status-section">
            <div class="status-section-title">
              <ix-icon name="info" size="16"></ix-icon>
              Tree Status & Actions
            </div>

            <div class="status-display">
              Status: {{ getTreeStatus() }}
            </div>

            <div class="removed-items" *ngIf="removedItems.length > 0">
              <div class="removed-items-title">Recently Removed Items (Click to Restore):</div>
              <div>
                <span
                  *ngFor="let subtree of removedItems"
                  class="removed-item">
                  <span class="removed-item-name">{{ subtree.rootItem.name }}</span>
                  <ix-icon
                    name="refresh"
                    size="12"
                    class="restore-btn"
                    [class.restoring]="isRestoring(subtree)"
                    [class.demo-disabled]="isAutoDemoRunning"
                    (click)="!isRestoring(subtree) && !isAutoDemoRunning && restoreRemovedItem(subtree)"
                    [style.pointer-events]="isRestoring(subtree) || isAutoDemoRunning ? 'none' : 'auto'"
                    [style.cursor]="isRestoring(subtree) || isAutoDemoRunning ? 'not-allowed' : 'pointer'"
                    title="Restore {{ subtree.rootItem.name }}">
                  </ix-icon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TreeWithActionsInsideDropdown implements OnDestroy {
  protected treeModel: TreeModel<FamilyMember> = {};
  protected filteredTreeModel: TreeModel<FamilyMember> = {};
  protected treeContext: TreeContext = {};
  protected filterText: string = '';
  protected newMemberName: string = '';
  protected removedItems: RemovedSubtree[] = [];
  protected restoringItems: Set<string> = new Set();

  // Auto-demo properties
  protected isAutoDemoRunning: boolean = false;
  protected currentDemoAction: string = '';
  protected countdown: number = 0;
  protected demoQueue: { action: string; countdown: number; execute: () => void }[] = [];
  protected removalMessageId: string | null = null;
  protected removalMessage: string = '';
  protected newlyAddedId: string | null = null;
  private dropdownOpenAttempted: boolean = false;

  @ViewChild('treeContainer', { static: false }) treeContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('treeDropdown', { static: false }) treeDropdown!: any;

  private nextId: number = 1000;
  private filteredMatches: Set<string> = new Set();
  private demoInterval: any = null;
  private selectionTimeout: any = null;
  private removalTimeout: any = null;

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.resetTree();
  }

  ngOnDestroy(): void {
    this.stopAutoDemo();

    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout);
      this.selectionTimeout = null;
    }
    if (this.removalTimeout) {
      clearTimeout(this.removalTimeout);
      this.removalTimeout = null;
    }
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
    this.applyFilter();
    this.initializeTreeContext();
    this.nextId = 1000;
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
    const matchingNodes = new Set<string>();

    matchingNodes.add('root');

    Object.keys(this.treeModel).forEach(nodeId => {
      const node = this.treeModel[nodeId];
      if (node.data && node.data.name.toLowerCase().includes(filterLower)) {
        matchingNodes.add(nodeId);
        this.filteredMatches.add(nodeId);
        this.addAncestors(nodeId, matchingNodes);
        this.addDescendants(nodeId, matchingNodes);
      }
    });

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

  protected isFilterMatch(item: FamilyMember): boolean {
    return this.filteredMatches.has(item.id);
  }

  protected isShowingRemovalMessage(item: FamilyMember): boolean {
    return this.removalMessageId === item.id;
  }

  protected isNewlyAdded(item: FamilyMember): boolean {
    return this.newlyAddedId === item.id;
  }

  protected hasFilteredResults(): boolean {
    return Object.keys(this.filteredTreeModel).length > 1;
  }

  protected getFilterStats(): string {
    const matchCount = this.filteredMatches.size;
    const totalCount = Object.keys(this.treeModel).length - 1;

    if (matchCount === 0) {
      return 'No matches found';
    } else if (matchCount === 1) {
      return '1 item found';
    } else {
      return `${matchCount} items found (${totalCount} total)`;
    }
  }

  private scrollToBottom(): void {
    if (!this.treeContainer?.nativeElement) return;

    setTimeout(() => {
      const container = this.treeContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, 200);
  }

  private scrollToElement(itemId: string): void {
    if (!this.treeContainer?.nativeElement) return;

    let attempts = 0;
    const maxAttempts = 8;

    const tryScroll = () => {
      const container = this.treeContainer.nativeElement;
      const element = container.querySelector(`[data-item-id="${itemId}"]`) as HTMLElement;

      if (element) {
        const hasHighlighting = element.classList.contains('newly-added');

        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (!hasHighlighting && attempts < 3) {
          attempts++;
          setTimeout(tryScroll, 100);
          return;
        }
        return;
      }

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 150 * attempts);
      }
    };

    setTimeout(tryScroll, 50);
  }

  protected addChild(parentItem: FamilyMember): void {
    if (this.isAutoDemoRunning) return;
    if (!parentItem.id) return;

    const memberName = prompt(`Enter name for new child of ${parentItem.name}:`);
    if (!memberName?.trim()) return;

    this.addMemberToTree(memberName.trim(), parentItem.id);
  }

  protected removeItem(item: FamilyMember): void {
    if (this.isAutoDemoRunning) return;
    if (!item.id || item.id === 'root') return;

    const descendantCount = this.getDescendantCount(item.id);
    const message = descendantCount > 0
      ? `Remove ${item.name} and ${descendantCount} descendant(s)?`
      : `Remove ${item.name}?`;

    if (confirm(message)) {
      // Capture the entire subtree before removal
      const subtree = this.captureSubtree(item.id);
      if (subtree) {
        this.removedItems.push(subtree);
      }

      this.removeMemberFromTree(item.id);
    }
  }

  private addMemberToTree(name: string, parentId: string): string {
    const newId = `member_${this.nextId++}`;
    const newTreeModel = { ...this.treeModel };

    newTreeModel[newId] = {
      id: newId,
      hasChildren: false,
      children: [],
      data: { id: newId, name: name }
    };

    if (newTreeModel[parentId]) {
      newTreeModel[parentId] = {
        ...newTreeModel[parentId],
        children: [...newTreeModel[parentId].children, newId],
        hasChildren: true
      };
    }

    this.treeModel = newTreeModel;
    this.applyFilter();
    this.cdr.detectChanges();

    this.treeContext = {
      ...this.treeContext,
      [parentId]: { isExpanded: true, isSelected: false }
    };

    this.cdr.detectChanges();
    return newId;
  }

  private removeMemberFromTree(memberId: string): void {
    const newTreeModel = { ...this.treeModel };
    const newTreeContext = { ...this.treeContext };

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

    this.removeNodeAndDescendants(memberId, newTreeModel, newTreeContext);
    this.treeModel = newTreeModel;
    this.applyFilter();
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
    // Handle node toggle events if needed
  }

  protected onSelectionChanged(event: any): void {
    // Handle selection changes if needed
  }

  protected addMemberToRootProgrammatically(): void {
    if (this.isAutoDemoRunning) return;
    if (!this.newMemberName.trim()) return;

    this.addMemberToTree(this.newMemberName.trim(), 'root');
    this.newMemberName = '';
  }

  protected removeRandomMemberProgrammatically(): void {
    if (this.isAutoDemoRunning) return;
    const nonRootMembers = Object.keys(this.treeModel)
      .filter(id => id !== 'root' && this.treeModel[id].data)
      .map(id => this.treeModel[id].data!);

    if (nonRootMembers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * nonRootMembers.length);
    const memberToRemove = nonRootMembers[randomIndex];

    const subtree = this.captureSubtree(memberToRemove.id);
    if (subtree) {
      this.removedItems.push(subtree);
    }

    this.removeMemberFromTree(memberToRemove.id);
    this.cdr.detectChanges();
  }

  protected resetTreeProgrammatically(): void {
    if (this.isAutoDemoRunning) return;
    this.removedItems = [];
    this.restoringItems.clear();
    this.removalMessageId = null;
    this.removalMessage = '';

    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout);
      this.selectionTimeout = null;
    }
    if (this.removalTimeout) {
      clearTimeout(this.removalTimeout);
      this.removalTimeout = null;
    }

    this.resetTree();
  }

  protected restoreRemovedItem(subtree: RemovedSubtree): void {
    if (this.isAutoDemoRunning) return;
    const subtreeKey = this.getSubtreeKey(subtree);

    if (this.restoringItems.has(subtreeKey)) {
      return;
    }

    console.log('Attempting to restore subtree:', subtree.rootItem.name);
    console.log('Before restoration - removedItems count:', this.removedItems.length);

    // Mark as being restored
    this.restoringItems.add(subtreeKey);
    this.cdr.detectChanges();

    // Perform the restoration
    this.restoreSubtree(subtree);

    // Remove from removed items list using a more reliable method
    const indexToRemove = this.removedItems.findIndex(item =>
      item.originalRootId === subtree.originalRootId &&
      item.rootItem.name === subtree.rootItem.name &&
      item.originalParentId === subtree.originalParentId
    );

    if (indexToRemove !== -1) {
      this.removedItems.splice(indexToRemove, 1);
      console.log('Removed item from removedItems list at index:', indexToRemove);
    } else {
      console.warn('Could not find item to remove from removedItems list');
    }

    // Remove from restoring set
    this.restoringItems.delete(subtreeKey);

    console.log('After restoration - removedItems count:', this.removedItems.length);
    this.cdr.detectChanges();
  }

  protected isRestoring(subtree: RemovedSubtree): boolean {
    const subtreeKey = this.getSubtreeKey(subtree);
    return this.restoringItems.has(subtreeKey);
  }

  private getSubtreeKey(subtree: RemovedSubtree): string {
    return `${subtree.originalRootId}_${subtree.rootItem.name}_${subtree.originalParentId}`;
  }

  // Auto Demo Methods
  protected startAutoDemo(): void {
    if (this.isAutoDemoRunning) return;

    console.log('Starting Auto Demo...');
    this.isAutoDemoRunning = true;
    this.dropdownOpenAttempted = false; // Reset the flag
    this.currentDemoAction = 'Initializing auto demo...';
    this.countdown = 3;

    // Open the dropdown to show the demo
    setTimeout(() => {
      if (!this.dropdownOpenAttempted) {
        this.openDropdownForDemo();
      }
    }, 100);

    // Retry opening dropdown if first attempt doesn't work
    setTimeout(() => {
      if (!this.dropdownOpenAttempted) {
        this.openDropdownForDemo();
      }
    }, 500);

    // Final retry with longer delay
    setTimeout(() => {
      if (!this.dropdownOpenAttempted) {
        this.openDropdownForDemo();
      }
    }, 1000);

    // Create demo sequence
    this.demoQueue = [
      {
        action: 'Adding new member to the root',
        countdown: 8,
        execute: () => this.autoDemoAddMember()
      },
      {
        action: 'Removing member',
        countdown: 10,
        execute: () => this.autoDemoRemoveMember()
      },
      {
        action: 'Removing member with children',
        countdown: 10,
        execute: () => this.autoDemoRemoveMemberWithChildren()
      },
      {
        action: 'Restoring both removed items',
        countdown: 10,
        execute: () => this.autoDemoRestoreAllItems()
      },
      {
        action: 'Demo completed - resetting...',
        countdown: 10,
        execute: () => this.autoDemoResetTree()
      }
    ];

    this.executeNextDemoAction();
  }

  protected stopAutoDemo(): void {
    if (this.demoInterval) {
      clearInterval(this.demoInterval);
      this.demoInterval = null;
    }
    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout);
      this.selectionTimeout = null;
    }
    if (this.removalTimeout) {
      clearTimeout(this.removalTimeout);
      this.removalTimeout = null;
    }
    this.isAutoDemoRunning = false;
    this.currentDemoAction = '';
    this.countdown = 0;
    this.demoQueue = [];
    this.removalMessageId = null;
    this.removalMessage = '';
    this.newlyAddedId = null;
    this.cdr.detectChanges();
    console.log('Auto Demo stopped');
  }

  private openDropdownForDemo(): void {
    if (!this.treeDropdown) {
      console.log('Dropdown reference not available');
      return;
    }

    // Early return if we've already attempted to open the dropdown
    if (this.dropdownOpenAttempted) {
      console.log('Dropdown opening already attempted, skipping...');
      return;
    }

    console.log('Attempting to open dropdown for auto demo...');

    try {
      this.dropdownOpenAttempted = true; // Mark as attempted early to prevent multiple attempts

      // Method 1: Try IX component methods (most reliable)
      const ixMethods = ['open', 'toggle', 'show', 'showDropdown', 'toggleDropdown'];
      for (const methodName of ixMethods) {
        if (this.treeDropdown[methodName] && typeof this.treeDropdown[methodName] === 'function') {
          console.log(`Opening dropdown using IX component method: ${methodName}()`);
          this.treeDropdown[methodName]();
          return;
        }
      }

      // Method 2: Get dropdown element and check if already open
      let dropdownElement = this.getDropdownElement();
      if (!dropdownElement) {
        // Search in DOM as fallback
        dropdownElement = document.querySelector('ix-dropdown-button.tree-dropdown') ||
                         document.querySelector('ix-dropdown-button') as HTMLElement;
        if (dropdownElement) {
          console.log('Found dropdown element in DOM');
        }
      }

      if (dropdownElement) {
        // Check if already open
        const isOpen = dropdownElement.hasAttribute('open') ||
                      dropdownElement.classList.contains('open') ||
                      dropdownElement.querySelector('[aria-expanded="true"]');

        if (isOpen) {
          console.log('Dropdown is already open');
          return;
        }

        // Try clicking the dropdown element
        if (dropdownElement.click) {
          console.log('Opening dropdown via element click');
          dropdownElement.click();
          return;
        }

        // Try clicking internal button
        const button = dropdownElement.querySelector('button') ||
                      dropdownElement.querySelector('[role="button"]');
        if (button && (button as HTMLElement).click) {
          console.log('Opening dropdown via internal button click');
          (button as HTMLElement).click();
          return;
        }

        // Try dispatching click event
        console.log('Opening dropdown via dispatched click event');
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        dropdownElement.dispatchEvent(clickEvent);
        return;
      }

      console.log('Could not open dropdown - no suitable method found');
    } catch (error) {
      console.error('Error opening dropdown:', error);
    }
  }

  private getDropdownElement(): HTMLElement | null {
    // Try different ways to access the DOM element for IxDropdownButton2
    const elementPaths = [
      () => this.treeDropdown.el?.nativeElement,
      () => this.treeDropdown.nativeElement,
      () => this.treeDropdown.hostElement,
      () => (this.treeDropdown as any).elementRef?.nativeElement,
      () => (this.treeDropdown as any).element,
      () => (this.treeDropdown as any)._elementRef?.nativeElement,
    ];

    for (const getElement of elementPaths) {
      try {
        const element = getElement();
        if (element && element.tagName) {
          return element;
        }
      } catch {
        // Continue to next approach
      }
    }

    return null;
  }

  private executeNextDemoAction(): void {
    if (!this.isAutoDemoRunning || this.demoQueue.length === 0) {
      this.stopAutoDemo();
      return;
    }

    const nextAction = this.demoQueue.shift()!;
    this.currentDemoAction = nextAction.action;
    this.countdown = nextAction.countdown;

    console.log(`Demo: ${nextAction.action} in ${nextAction.countdown} seconds`);

    this.demoInterval = setInterval(() => {
      this.countdown--;
      this.cdr.detectChanges();

      if (this.countdown <= 0) {
        clearInterval(this.demoInterval);
        this.demoInterval = null;

        // Execute the action
        nextAction.execute();

        // Wait a moment then proceed to next action
        setTimeout(() => {
          if (this.isAutoDemoRunning) {
            // Clear any lingering messages before next action
            if (this.demoQueue.length > 0) {
              // Only clear if not the last action (reset)
              this.currentDemoAction = '';
              this.cdr.detectChanges();
            }
            this.executeNextDemoAction();
          }
        }, 2000); // Reduced delay to 2 seconds for smoother transitions
      }
    }, 1000);

    this.cdr.detectChanges();
  }

  private autoDemoAddMember(): void {
    const memberNames = [
      'Demo Member Alpha', 'Demo Member Beta', 'Demo Member Gamma',
      'Demo Member Delta', 'Demo Member Epsilon', 'Demo Member Zeta'
    ];
    const randomName = memberNames[Math.floor(Math.random() * memberNames.length)];

    this.currentDemoAction = `Adding new member to the root`;
    const newMemberId = this.addMemberToTree(randomName, 'root');
    this.newlyAddedId = newMemberId;

    this.cdr.detectChanges();
    setTimeout(() => {
      this.scrollToBottom();
      setTimeout(() => {
        this.scrollToElement(newMemberId);
      }, 300);

      // Update message after scroll completes and keep green highlight for a while
      setTimeout(() => {
        this.currentDemoAction = `✅ Added: ${randomName}`;
        this.cdr.detectChanges();

        // Remove green highlighting after showing the success message
        setTimeout(() => {
          this.newlyAddedId = null;
          this.cdr.detectChanges();
        }, 3000); // Keep green highlight for 3 seconds
      }, 1000);
    }, 1000); // Increased delay to ensure DOM is fully updated
  }

  private autoDemoRemoveMember(): void {
    const nonRootMembers = Object.keys(this.treeModel)
      .filter(id => id !== 'root' && this.treeModel[id].data)
      .map(id => this.treeModel[id].data!)
      .filter(member => member.id !== this.newlyAddedId); // Exclude newly added item

    if (nonRootMembers.length === 0) {
      console.log('Auto Demo: No members to remove (excluding newly added)');
      this.currentDemoAction = '⚠️ No members available to remove (excluding newly added)';
      return;
    }

    const memberToRemove = nonRootMembers[nonRootMembers.length - 1];

    this.currentDemoAction = `🎯 Selected ${memberToRemove.name} for removal`;

    this.cdr.detectChanges();
    setTimeout(() => {
      this.scrollToElement(memberToRemove.id);

      setTimeout(() => {
        this.currentDemoAction = `⏱️ Removing ${memberToRemove.name} in 3 seconds...`;
        this.cdr.detectChanges();
      }, 2000);
    }, 500);

    setTimeout(() => {
      const subtree = this.captureSubtree(memberToRemove.id);
      if (subtree) {
        this.removedItems.push(subtree);
      }

      this.removeMemberFromTree(memberToRemove.id);

      this.currentDemoAction = `✅ Removed ${memberToRemove.name}`;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.currentDemoAction = '';
        this.cdr.detectChanges();
      }, 2000);
    }, 5000);
  }

  private autoDemoRemoveMemberWithChildren(): void {
    const membersWithChildren = Object.keys(this.treeModel)
      .filter(id => id !== 'root' && this.treeModel[id].data && this.treeModel[id].hasChildren)
      .map(id => this.treeModel[id].data!)
      .filter(member => member.id !== this.newlyAddedId);

    if (membersWithChildren.length === 0) {
      console.log('Auto Demo: No members with children to remove (excluding newly added), falling back to any member');
      // Fall back to regular removal if no members with children exist
      this.autoDemoRemoveMember();
      return;
    }

    const memberToRemove = membersWithChildren[membersWithChildren.length - 1];

    this.currentDemoAction = `🎯 Selected ${memberToRemove.name} with children for removal`;

    this.cdr.detectChanges();
    setTimeout(() => {
      this.scrollToElement(memberToRemove.id);

      setTimeout(() => {
        this.currentDemoAction = `⏱️ Removing ${memberToRemove.name} and children in 3 seconds...`;
        this.cdr.detectChanges();
      }, 2000);
    }, 500);

    setTimeout(() => {

      // Capture subtree for restoration (this will include all children)
      const subtree = this.captureSubtree(memberToRemove.id);
      if (subtree) {
        this.removedItems.push(subtree);
      }

      this.removeMemberFromTree(memberToRemove.id);

      this.currentDemoAction = `✅ Removed ${memberToRemove.name} and children`;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.currentDemoAction = '';
        this.cdr.detectChanges();
      }, 2000);
    }, 5000);
  }

  private autoDemoRestoreAllItems(): void {
    if (this.removedItems.length === 0) {
      this.currentDemoAction = '⚠️ No items available to restore';
      return;
    }

    console.log(`Auto Demo: Restoring all ${this.removedItems.length} removed items`);
    this.currentDemoAction = `Restoring ${this.removedItems.length} removed items...`;

    // Store the items to restore and clear the removed items array
    const itemsToRestore = [...this.removedItems];
    this.removedItems = [];

    // Collect all member names for display
    const restoredNames: string[] = [];

    // Restore each item with a small delay for visual effect
    itemsToRestore.forEach((subtree, index) => {
      setTimeout(() => {
        console.log(`Auto Demo: Restoring item ${index + 1}/${itemsToRestore.length} -`, subtree.rootItem.name);
        this.restoreSubtree(subtree);
        restoredNames.push(subtree.rootItem.name);

        // Update the action message to show progress
        this.currentDemoAction = `Restoring: ${restoredNames.join(', ')}`;

        // If this is the last item, show completion message
        if (index === itemsToRestore.length - 1) {
          setTimeout(() => {
            this.currentDemoAction = `✅ Restored: ${restoredNames.join(', ')}`;
            // Clear message after 4 seconds
            setTimeout(() => {
              this.currentDemoAction = '';
              this.cdr.detectChanges();
            }, 4000);
          }, 500);
        }
        this.cdr.detectChanges();
      }, index * 500); // 500ms delay between each restoration
    });
  }  private autoDemoRestoreItem(): void {
    if (this.removedItems.length === 0) {
      console.log('Auto Demo: No items to restore');
      this.currentDemoAction = '⚠️ No items available to restore';
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.removedItems.length);
    const subtreeToRestore = this.removedItems[randomIndex];

    console.log('Auto Demo: Restoring item -', subtreeToRestore.rootItem.name);
    this.restoreSubtree(subtreeToRestore);
    this.removedItems.splice(randomIndex, 1);
    this.currentDemoAction = `🔄 Restored: ${subtreeToRestore.rootItem.name}`;
  }

  private autoDemoResetTree(): void {
    console.log('Auto Demo: Resetting tree');

    // Clear all state and timeouts
    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout);
      this.selectionTimeout = null;
    }
    if (this.removalTimeout) {
      clearTimeout(this.removalTimeout);
      this.removalTimeout = null;
    }

    this.removedItems = [];
    this.restoringItems.clear();
    this.removalMessageId = null;
    this.removalMessage = '';
    this.newlyAddedId = null;
    this.currentDemoAction = '🔄 Resetting tree to original state...';
    this.resetTree();

    // Clear message after showing reset completion
    setTimeout(() => {
      this.currentDemoAction = '✅ Tree reset complete';
      setTimeout(() => {
        this.currentDemoAction = '';
        this.isAutoDemoRunning = false;
        this.cdr.detectChanges();
      }, 2000);
    }, 1000);
  }

  protected getTreeStatus(): string {
    const totalItems = Object.keys(this.treeModel).length - 1;
    const filteredItems = this.filterText ? this.filteredMatches.size : totalItems;
    const removedItemsCount = this.removedItems.length;

    return `${totalItems} total items, ${filteredItems} shown, ${removedItemsCount} removed`;
  }

  protected getDropdownLabel(): string {
    if (this.isAutoDemoRunning) {
      return '🎬 Demo Active - Family Tree';
    }
    return 'Family Tree';
  }

  private findParentId(childId: string): string | null {
    for (const [nodeId, node] of Object.entries(this.treeModel)) {
      if (node.children.includes(childId)) {
        return nodeId;
      }
    }
    return null;
  }

  private captureSubtree(rootNodeId: string): RemovedSubtree | null {
    if (!this.treeModel[rootNodeId]) {
      console.warn(`Cannot capture subtree: node ${rootNodeId} does not exist`);
      return null;
    }

    const parentId = this.findParentId(rootNodeId);
    if (!parentId) {
      console.warn(`Cannot capture subtree: no parent found for ${rootNodeId}`);
      return null;
    }

    console.log(`Capturing subtree for ${rootNodeId}, parent: ${parentId}`);

    const subtreeModel: TreeModel<FamilyMember> = {};
    const subtreeContext: TreeContext = {};

    // Recursively capture all nodes in the subtree
    const captureNode = (nodeId: string) => {
      if (this.treeModel[nodeId]) {
        // Deep copy the node to prevent reference issues
        subtreeModel[nodeId] = JSON.parse(JSON.stringify(this.treeModel[nodeId]));
        if (this.treeContext[nodeId]) {
          subtreeContext[nodeId] = JSON.parse(JSON.stringify(this.treeContext[nodeId]));
        }

        // Recursively capture children
        this.treeModel[nodeId].children.forEach(childId => {
          captureNode(childId);
        });
      }
    };

    captureNode(rootNodeId);

    const result = {
      rootItem: JSON.parse(JSON.stringify(this.treeModel[rootNodeId].data!)),
      originalRootId: rootNodeId,
      originalParentId: parentId,
      subtreeModel,
      subtreeContext
    };

    console.log(`Captured subtree:`, {
      rootItem: result.rootItem.name,
      nodeCount: Object.keys(subtreeModel).length,
      parentId
    });

    return result;
  }

  private restoreSubtree(subtree: RemovedSubtree): void {
    console.log(`Starting restoration of subtree for: ${subtree.rootItem.name}`);
    console.log(`Before restoration, removedItems count: ${this.removedItems.length}`);

    // Check if original parent still exists
    if (!this.treeModel[subtree.originalParentId]) {
      console.warn(`Cannot restore ${subtree.rootItem.name}: original parent ${subtree.originalParentId} no longer exists`);
      return;
    }

    // Create new tree model
    const newTreeModel = { ...this.treeModel };
    const newTreeContext = { ...this.treeContext };

    // Create ID mapping for the restored nodes
    const idMapping: Map<string, string> = new Map();

    // First pass: create new IDs for all nodes in the subtree
    Object.keys(subtree.subtreeModel).forEach(oldId => {
      const newId = `restored_${this.nextId++}`;
      idMapping.set(oldId, newId);
    });

    // Second pass: recreate all nodes with new IDs and updated relationships
    Object.entries(subtree.subtreeModel).forEach(([oldId, node]) => {
      const newId = idMapping.get(oldId)!;

      // Map old child IDs to new child IDs
      const newChildren = node.children.map(oldChildId => idMapping.get(oldChildId)!);

      newTreeModel[newId] = {
        ...node,
        id: newId,
        children: newChildren,
        data: node.data ? {
          ...node.data,
          id: newId
        } : node.data
      };

      // Restore context if it existed
      if (subtree.subtreeContext[oldId]) {
        newTreeContext[newId] = { ...subtree.subtreeContext[oldId] };
      }
    });

    // Add the root of the restored subtree to its original parent
    const newRootId = idMapping.get(subtree.originalRootId)!;
    if (newTreeModel[subtree.originalParentId]) {
      newTreeModel[subtree.originalParentId] = {
        ...newTreeModel[subtree.originalParentId],
        children: [...newTreeModel[subtree.originalParentId].children, newRootId],
        hasChildren: true
      };
    }

    // Ensure the original parent is expanded
    newTreeContext[subtree.originalParentId] = {
      isExpanded: true,
      isSelected: false
    };

    // Update the models
    this.treeModel = newTreeModel;
    this.treeContext = newTreeContext;
    this.applyFilter();
    this.cdr.detectChanges();

    console.log(`Subtree restored successfully. Root ID: ${newRootId}`);
    console.log(`Restored nodes: ${Array.from(idMapping.values()).join(', ')}`);
    console.log(`After restoration, removedItems count: ${this.removedItems.length}`);
  }
}

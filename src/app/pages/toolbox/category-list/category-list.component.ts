import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../_interfaces_/category.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Input() public categories: Array<Category>;
  @Output() resetFilters: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  public isCategoryNotEmpty(category: Category): boolean {
    return category && category.name && category.links.length > 0;
  }

  public resetSearchCriteria(): void {
    this.resetFilters.emit();
  }
}

import { Component, Input } from '@angular/core';
import { Category } from '../_interfaces_/category.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  @Input() public categories: Array<Category>;
  constructor() {}

  public isCategoryNotEmpty(category: Category): boolean {
    return category && category.name && category.links.length > 0;
  }
}

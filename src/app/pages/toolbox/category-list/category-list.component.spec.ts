import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Category } from '../_interfaces_/category.interface';
import { Link } from '../_interfaces_/link.interface';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit reset event', () => {
    const resetFilterSpy = jest.spyOn(component.resetFilters, 'emit');
    component.resetSearchCriteria();
    expect(resetFilterSpy).toHaveBeenCalled();
  });

  it('should check, if category is not empty (not empty)', () => {
    const category = { id: 'category', name: 'Category', links: [{ name: 'test', url: 'url' } as Link] } as Category;
    expect(component.isCategoryNotEmpty(category)).toBeTruthy();
  });

  it('should check, if category is not empty (empty)', () => {
    const category = { id: 'category', name: 'Category', links: [] } as Category;
    expect(component.isCategoryNotEmpty(category)).toBeFalsy();
  });
});

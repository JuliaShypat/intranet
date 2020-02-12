import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolboxService } from './toolbox.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from './_interfaces_/category.interface';
import { Link } from './_interfaces_/link.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit, OnDestroy {
  public categories: Array<Category>;
  public searchBox: FormControl;
  private unsubscribeAll$: Subject<void> = new Subject();

  constructor(private toolboxService: ToolboxService) {}

  ngOnInit() {
    this.getPageData();
    this.createSearchForm();
    this.listenToSearch();
  }

  public getPageData(): void {
    this.toolboxService
      .getCategoriesList()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(data => {
        this.categories = data;
      });
  }

  public createSearchForm(): void {
    this.searchBox = new FormControl('');
  }

  public listenToSearch(): void {
    this.searchBox.valueChanges.pipe(takeUntil(this.unsubscribeAll$)).subscribe((value: string) => {
      if (value.length >= 3) {
        this.filterCategories(value);
      }
    });
  }

  public filterCategories(searchedValue: string): void {
    this.categories = this.categories.filter(category => this.checkLinksOrTitleForSubstring(category, searchedValue));
  }

  public checkLinksOrTitleForSubstring(category: Category, searchedValue: string): Category {
    const searchedValueLowerCase = searchedValue.toLowerCase();
    let mappedCategory: Category;
    if (category.name.toLowerCase().includes(searchedValueLowerCase)) {
      mappedCategory = category;
    } else {
      const filteredLinks = this.checkLinksForSubstring(category.links, searchedValueLowerCase);
      if (filteredLinks.length > 0) {
        mappedCategory = { ...category, links: filteredLinks };
      } else {
        mappedCategory = null;
      }
    }
    return mappedCategory;
  }

  public checkLinksForSubstring(links: Array<Link>, searchedValue: string): Array<Link> {
    const filteredLinks = links.filter(link => link.name.toLowerCase().includes(searchedValue));
    return filteredLinks;
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }
}

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
    const searchedValueLowerCase = searchedValue.toLowerCase();
    this.categories = this.categories.reduce((filtered, category) => {
      if (this.isCategoryIncludeSubstring(category, searchedValueLowerCase)) {
        filtered.push(category);
      } else {
        const filteredLinks = this.getLinksIncludeSubstring(category.links, searchedValueLowerCase);
        if (filteredLinks.length > 0) {
          filtered.push({ ...category, links: filteredLinks });
        }
      }
      return filtered;
    }, []);
  }

  public isCategoryIncludeSubstring(category: Category, substring: string): boolean {
    return category.name.toLowerCase().includes(substring);
  }

  public getLinksIncludeSubstring(links: Array<Link>, substring: string): Array<Link> {
    const filteredLinks = links.filter(link => link.name.toLowerCase().includes(substring));
    return filteredLinks;
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }
}

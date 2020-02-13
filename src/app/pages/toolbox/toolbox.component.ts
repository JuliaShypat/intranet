import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolboxService } from './toolbox.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from './_interfaces_/category.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit, OnDestroy {
  public categoriesToDisplay: Array<Category>;
  public searchBox: FormControl;
  private categories: Array<Category>;
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
      .subscribe((data: Array<Category>) => {
        this.setCategories(data);
      });
  }

  public createSearchForm(): void {
    this.searchBox = new FormControl('');
  }

  public listenToSearch(): void {
    this.searchBox.valueChanges.pipe(takeUntil(this.unsubscribeAll$)).subscribe((value: string) => {
      value.length >= 3 ? this.filterCategories(value) : this.resetSearch();
    });
  }

  private filterCategories(searchedValue: string): void {
    this.categoriesToDisplay = this.toolboxService.getFilteredCategories(this.categories, searchedValue.toLowerCase());
  }

  public resetSearch(): void {
    this.categoriesToDisplay = this.getCategories();
  }

  public clearField(): void {
    this.searchField.patchValue('');
  }

  private getCategories(): Array<Category> {
    return this.categories;
  }

  private setCategories(data: Array<Category>): void {
    this.categories = data;
    this.categoriesToDisplay = data;
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  get searchField(): FormControl {
    return this.searchBox;
  }
}

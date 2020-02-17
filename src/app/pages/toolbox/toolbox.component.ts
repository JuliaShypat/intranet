import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ToolboxService } from './toolbox.service';
import { Subject } from 'rxjs';
import { takeUntil, concatMap, take } from 'rxjs/operators';
import { Category } from './_interfaces_/category.interface';
import { FormControl } from '@angular/forms';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit, OnDestroy {
  public filteredCategories: Array<Category>;
  private allCategories: Array<Category>;
  private unsubscribeAll$: Subject<void> = new Subject();

  constructor(private toolboxService: ToolboxService, private configService: ConfigService) {}

  ngOnInit() {
    this.getPageData();
  }

  public getPageData(): void {
    this.toolboxService
      .getCategoriesList()
      .pipe(take(1))
      .subscribe((data: Array<Category>) => {
        this.setCategories(data);
        // Listen to language change only after initial get of data
        this.listenForLangChange();
      });
  }

  public listenForLangChange(): void {
    this.toolboxService
      .getTranslatedPageData()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((data: Array<Category>) => {
        this.setCategories(data);
      });
  }

  public searchInCategories(text: string): void {
    text.length >= this.configService.getProperty<number>('NUMBER_OF_SYMBOLS_TO_START_SEARCH')
      ? this.filterCategories(text)
      : this.resetSearch();
  }

  public resetSearch(): void {
    this.filteredCategories = this.getCategories();
  }

  private getCategories(): Array<Category> {
    return this.allCategories;
  }
  private filterCategories(searchedValue: string): void {
    this.filteredCategories = this.toolboxService.getFilteredCategories(this.allCategories, searchedValue.toLowerCase());
  }

  private setCategories(data: Array<Category>): void {
    this.allCategories = data;
    this.filteredCategories = data;
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }
}

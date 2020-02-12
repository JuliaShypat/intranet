import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolboxService } from './toolbox.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from './_interfaces_/category.interface';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit, OnDestroy {
  public categories: Array<Category>;
  private unsubscribeAll$: Subject<void> = new Subject();

  constructor(private toolboxService: ToolboxService) {}

  ngOnInit() {
    this.getPageData();
  }

  public getPageData(): void {
    this.toolboxService
      .getCategoriesList()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(data => {
        this.categories = data;
      });
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }
}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() public placeholder: string;
  @Input() public formClasses: string;
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();
  public searchForm: FormGroup;
  private unsubscribeAll$: Subject<void> = new Subject();

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.createSearchForm();
    this.listenToSearch();
  }

  public createSearchForm(): void {
    this.searchForm = new FormGroup({
      searchBox: new FormControl('')
    });
  }

  public listenToSearch(): void {
    this.searchField.valueChanges.pipe(takeUntil(this.unsubscribeAll$)).subscribe((value: string) => {
      this.valueChange.emit(value);
    });
  }

  public clearField(): void {
    this.searchField.patchValue('');
  }

  public isSearchCanBeCleared(): boolean {
    return this.searchField.value.length >= this.configService.getProperty<number>('NUMBER_OF_SYMBOLS_TO_START_SEARCH');
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  get searchField(): AbstractControl {
    return this.searchForm.get('searchBox');
  }
}

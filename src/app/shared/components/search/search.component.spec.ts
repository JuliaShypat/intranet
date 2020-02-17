import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

class ConfigServiceStub {
  getProperty() {}
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: ConfigService, useClass: ConfigServiceStub }],
      declarations: [SearchComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    configService = TestBed.get(ConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#OnInit', () => {
    it('should call function to create search form', () => {
      const createFormSpy = jest.spyOn(component, 'createSearchForm');
      component.ngOnInit();
      expect(createFormSpy).toHaveBeenCalledTimes(1);
    });

    it('should call function to handle search', () => {
      const listenToSearchSpy = jest.spyOn(component, 'listenToSearch');
      component.ngOnInit();
      expect(listenToSearchSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should listen to search field chnages and emit event', fakeAsync(() => {
    component.searchForm = new FormGroup({
      searchBox: new FormControl('')
    });
    const valueChnagedSpy = jest.spyOn(component.valueChange, 'emit');
    component.listenToSearch();
    component.searchField.patchValue('new test value');
    tick();
    expect(valueChnagedSpy).toHaveBeenCalledWith('new test value');
  }));

  it('should create search form of defined structure', () => {
    const expected = new FormGroup({
      searchBox: new FormControl('')
    });
    component.createSearchForm();
    expect(component.searchForm.value).toEqual(expected.value);
  });

  it('should clear fields value', () => {
    const searchFieldSpy = jest.spyOn(component.searchField, 'patchValue');
    component.clearField();
    expect(searchFieldSpy).toHaveBeenCalledWith('');
  });

  describe('isSearchCanBeCleared', () => {
    it('should check if search field can be cleared, search field has more symbols than config', () => {
      component.searchField.patchValue('test');
      jest.spyOn(configService, 'getProperty').mockReturnValue(3);
      const result = component.isSearchCanBeCleared();
      expect(result).toBeTruthy();
    });

    it('should check if search field can be cleared, search fiels has less symbols than config', () => {
      component.searchField.patchValue('hi');
      jest.spyOn(configService, 'getProperty').mockReturnValue(3);
      const result = component.isSearchCanBeCleared();
      expect(result).toBeFalsy();
    });
  });

  it('should get search field from form', () => {
    component.searchForm.patchValue({
      searchBox: 'test'
    });
    const field = component.searchField;
    expect(field.value).toEqual('test');
  });
});

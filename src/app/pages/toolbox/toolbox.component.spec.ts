import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ToolboxComponent } from './toolbox.component';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToolboxService } from './toolbox.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { of } from 'rxjs';
import { Category } from './_interfaces_/category.interface';

class ConfigServiceStub {
  getProperty() {}
}
class ToolboxServiceStub {
  getCategoriesList() {
    return of([{ id: 'test', name: 'Test', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }]);
  }
  getTranslatedPageData() {
    return of([{ id: 'test', name: 'Test', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }]);
  }
  getFilteredCategories() {
    return [{} as Category];
  }
}

describe('ToolboxComponent', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;
  let configService: ConfigService;
  let toolboxService: ToolboxService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolboxComponent],
      providers: [
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: ToolboxService, useClass: ToolboxServiceStub }
      ],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
    toolboxService = TestBed.get(ToolboxService);
    configService = TestBed.get(ConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#OnInit', () => {
    it('should get page data ', () => {
      const getPageDataSpy = jest.spyOn(component, 'getPageData');
      component.ngOnInit();
      expect(getPageDataSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should get data form service and listen to lang chnage', fakeAsync(() => {
    const langChangeSpy = jest.spyOn(component, 'listenForLangChange');
    const data = [{ id: 'test', name: 'Test', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }];
    component.getPageData();
    tick();
    expect(langChangeSpy).toHaveBeenCalled();
    expect(component.filteredCategories).toMatchObject(data);
  }));

  it('should get translated data form service when lang chnaged', fakeAsync(() => {
    const data = [{ id: 'test', name: 'Translated Test', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }];
    jest.spyOn(toolboxService, 'getTranslatedPageData').mockReturnValue(of(data));
    component.listenForLangChange();
    tick();
    expect(component.filteredCategories).toMatchObject(data);
  }));

  describe('#searchInCategories', () => {
    it('should start filtering, if value is long enought', () => {
      const data = [{ id: 'test', name: 'Filtered Category', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }];
      jest.spyOn(configService, 'getProperty').mockReturnValue(3);
      jest.spyOn(toolboxService, 'getFilteredCategories').mockReturnValue(data);
      const testText = 'Filtered';
      component.searchInCategories(testText);
      expect(component.filteredCategories).toMatchObject(data);
    });

    it('should reset list to original categories, if searched value is not long enought', fakeAsync(() => {
      const originalData = [
        { id: 'test', name: 'Translated Test', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }
      ];
      jest.spyOn(toolboxService, 'getTranslatedPageData').mockReturnValue(of(originalData));
      component.listenForLangChange();
      tick();
      const filteredData = [
        { id: 'test', name: 'Filtered Category', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }
      ];
      jest.spyOn(configService, 'getProperty').mockReturnValue(3);
      jest.spyOn(toolboxService, 'getFilteredCategories').mockReturnValue(filteredData);
      component.searchInCategories('Filtered');
      expect(component.filteredCategories).toMatchObject(filteredData);
      component.searchInCategories('Fi');
      expect(component.filteredCategories).toMatchObject(originalData);
    }));
  });
});

import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ToolboxService } from './toolbox.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { of } from 'rxjs';

class TranslateServiceStub {
  onLangChange = of({} as LangChangeEvent);
  public currentLang = 'pl';
}
describe('ToolboxService', () => {
  let service: ToolboxService;
  let httpMock: HttpTestingController;
  let translateService: TranslateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolboxService, { provide: TranslateService, useClass: TranslateServiceStub }],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(ToolboxService);
    httpMock = TestBed.get(HttpTestingController);
    translateService = TestBed.get(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make get call and return correct data, with provided lang param', () => {
    const expectedUrl = `assets/data/en/links.json`;
    const mockResult = [{ id: 'test', name: 'Test', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }];

    service.getCategoriesList('en').subscribe(data => {
      expect(data).toEqual(mockResult);
    });

    const mockReq = httpMock.expectOne(expectedUrl);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toBe('GET');
    mockReq.flush(mockResult);
    httpMock.verify();
  });

  it('should make get call and return correct data, with default lang param', () => {
    const expectedUrl = `assets/data/pl/links.json`;
    const mockResult = [{ id: 'test', name: 'Test', iconUrl: 'test', links: [{ id: 'link1', name: 'text', url: 'linkUrl' }] }];

    service.getCategoriesList().subscribe(data => {
      expect(data).toEqual(mockResult);
    });

    const mockReq = httpMock.expectOne(expectedUrl);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toBe('GET');
    mockReq.flush(mockResult);
    httpMock.verify();
  });

  it('should call get categories, when chnage event occurs', fakeAsync(() => {
    const getCategoriesListSpy = jest.spyOn(service, 'getCategoriesList');
    service.getTranslatedPageData().subscribe();
    tick();
    expect(getCategoriesListSpy).toHaveBeenCalled();
  }));

  describe('getFilteredCategories', () => {
    let categories;
    beforeEach(() => {
      categories = [
        { id: 'test', name: 'Test', iconUrl: 'test', links: [{ id: 'link1', name: 'link1', url: 'linkUrl' }] },
        {
          id: 'test1',
          name: 'Test1',
          iconUrl: 'test2',
          links: [
            { id: 'link2', name: 'link2', url: 'linkUrl' },
            { id: 'link3', name: 'link3', url: 'linkUrl' }
          ]
        },
        { id: 'test2', name: 'Test2', iconUrl: 'test3', links: [{ id: 'link4', name: 'link4', url: 'linkUrl' }] }
      ];
    });
    it('should return list of not mapped categories, if substring found in category name', () => {
      const result = service.getFilteredCategories(categories, 'test');
      expect(result).toEqual(categories);
    });

    it('should return empty list, if substring not found in category name or category links', () => {
      const result = service.getFilteredCategories(categories, 'notFound');
      expect(result).toEqual([]);
    });

    it('should return remmaped list, if substring found in links', () => {
      const result = service.getFilteredCategories(categories, 'link2');
      expect(result).toEqual([
        {
          id: 'test1',
          name: 'Test1',
          iconUrl: 'test2',
          links: [{ id: 'link2', name: 'link2', url: 'linkUrl' }]
        }
      ]);
    });
  });
});

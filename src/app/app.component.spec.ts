import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { ConfigService } from './core/services/config.service';

class TranslateServiceStub {
  setDefaultLang() {}
  use() {}
}
class ConfigServiceStub {
  getProperty() {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub }
      ],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = TestBed.get(TranslateService);
    configService = TestBed.get(ConfigService);
    fixture.detectChanges();
  });

  it('should instantiate component', () => {
    expect(component).toBeTruthy();
  });

  describe('#Default language', () => {
    it('should set default language from config', () => {
      const setDefaultLangSpy = jest.spyOn(translateService, 'setDefaultLang');
      const useLangSpy = jest.spyOn(translateService, 'use');
      jest.spyOn(configService, 'getProperty').mockReturnValue('test');
      fixture = TestBed.createComponent(AppComponent);
      expect(setDefaultLangSpy).toHaveBeenCalledWith('test');
      expect(useLangSpy).toHaveBeenCalledWith('test');
    });

    it('should use fallback language, if config returns nothing', () => {
      const setDefaultLangSpy = jest.spyOn(translateService, 'setDefaultLang');
      const useLangSpy = jest.spyOn(translateService, 'use');
      jest.spyOn(configService, 'getProperty').mockReturnValue('');

      fixture = TestBed.createComponent(AppComponent);
      expect(setDefaultLangSpy).toHaveBeenCalledWith('pl');
      expect(useLangSpy).toHaveBeenCalledWith('pl');
    });
  });
});

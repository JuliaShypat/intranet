import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

class ConfigServiceStub {
  getProperty() {}
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let translateService: TranslateService;
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService, { provide: ConfigService, useClass: ConfigServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    translateService = TestBed.get(TranslateService);
    configService = TestBed.get(ConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#OnInit', () => {
    it('should call function to set languages', () => {
      const setAvaliableLanguagesSpy = jest.spyOn(component, 'setAvaliableLanguages');
      component.ngOnInit();
      expect(setAvaliableLanguagesSpy).toHaveBeenCalledTimes(1);
    });

    it('should call function to set footer logo url', () => {
      const setFooterLogoSpy = jest.spyOn(component, 'setFooterLogo');
      component.ngOnInit();
      expect(setFooterLogoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#changeLanguage', () => {
    it('should change language, if code provided', () => {
      const translateUseSpy = jest.spyOn(translateService, 'use');
      component.changeLanguage('test');
      expect(translateUseSpy).toHaveBeenCalledWith('test');
    });

    it('should not change language, if code is not provided', () => {
      const translateUseSpy = jest.spyOn(translateService, 'use');
      component.changeLanguage('');
      expect(translateUseSpy).not.toHaveBeenCalled();
    });
  });

  it('should return current year for footer', () => {
    const currentYear = new Date().getFullYear();
    expect(component.getCurrentYear()).toEqual(currentYear);
  });

  it('should set languages from config service', () => {
    jest.spyOn(configService, 'getProperty').mockReturnValue(['lang1', 'lang2']);
    component.setAvaliableLanguages();
    expect(component.languages).toEqual(['lang1', 'lang2']);
  });

  it('should get logo name from config service and create correct url', () => {
    jest.spyOn(configService, 'getProperty').mockReturnValue('logo2.svg');
    component.setFooterLogo();
    expect(component.logoUrl).toEqual('assets/img/logo2.svg');
  });
});

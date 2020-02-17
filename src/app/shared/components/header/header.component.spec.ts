import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class ConfigServiceStub {
  getProperty() {}
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: ConfigService, useClass: ConfigServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    configService = TestBed.get(ConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#OnInit', () => {
    it('should call function to get navigation links', () => {
      const getNavigationLinksSpy = jest.spyOn(component, 'getNavigationLinks');
      component.ngOnInit();
      expect(getNavigationLinksSpy).toHaveBeenCalledTimes(1);
    });

    it('should call function to get logo url', () => {
      const getLogoUrlSpy = jest.spyOn(component, 'getLogoUrl');
      component.ngOnInit();
      expect(getLogoUrlSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should get links from config service', () => {
    jest.spyOn(configService, 'getProperty').mockReturnValue(['link1', 'link2']);
    component.getNavigationLinks();
    expect(component.navLinks).toEqual(['link1', 'link2']);
  });

  it('should get logo name from config service and create correct url', () => {
    jest.spyOn(configService, 'getProperty').mockReturnValue('logo.svg');
    component.getLogoUrl();
    expect(component.logoUrl).toEqual('assets/img/logo.svg');
  });
});

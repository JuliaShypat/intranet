import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpHandler, HttpClient } from '@angular/common/http';

class TranslateServiceStub {
  setDefaultLang() {}
  use() {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: TranslateService, useClass: TranslateServiceStub }, HttpHandler, HttpClient],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'predica-intranet'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('predica-intranet');
  });
});

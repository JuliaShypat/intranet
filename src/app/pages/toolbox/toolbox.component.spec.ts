import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
    return of([{} as Category]);
  }
  getTranslatedPageData() {
    return of([{} as Category]);
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
});

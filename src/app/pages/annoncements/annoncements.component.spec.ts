import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncementsComponent } from './annoncements.component';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AnnoncementsComponent', () => {
  let component: AnnoncementsComponent;
  let fixture: ComponentFixture<AnnoncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnoncementsComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

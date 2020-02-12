import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncementsComponent } from './annoncements.component';

describe('AnnoncementsComponent', () => {
  let component: AnnoncementsComponent;
  let fixture: ComponentFixture<AnnoncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncementsComponent ]
    })
    .compileComponents();
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

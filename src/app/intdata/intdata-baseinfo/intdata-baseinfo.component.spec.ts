import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntdataBaseinfoComponent } from './intdata-baseinfo.component';

describe('IntdataBaseinfoComponent', () => {
  let component: IntdataBaseinfoComponent;
  let fixture: ComponentFixture<IntdataBaseinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntdataBaseinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntdataBaseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

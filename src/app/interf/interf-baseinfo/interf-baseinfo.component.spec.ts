import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfBaseinfoComponent } from './interf-baseinfo.component';

describe('InterfBaseinfoComponent', () => {
  let component: InterfBaseinfoComponent;
  let fixture: ComponentFixture<InterfBaseinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfBaseinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfBaseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

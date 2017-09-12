import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntdataComponent } from './intdata.component';

describe('IntdataComponent', () => {
  let component: IntdataComponent;
  let fixture: ComponentFixture<IntdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

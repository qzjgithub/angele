import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfItemComponent } from './interf-item.component';

describe('InterfItemComponent', () => {
  let component: InterfItemComponent;
  let fixture: ComponentFixture<InterfItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

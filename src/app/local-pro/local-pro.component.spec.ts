import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProComponent } from './local-pro.component';

describe('LocalProComponent', () => {
  let component: LocalProComponent;
  let fixture: ComponentFixture<LocalProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

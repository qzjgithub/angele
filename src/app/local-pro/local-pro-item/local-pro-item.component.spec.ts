import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProItemComponent } from './local-pro-item.component';

describe('LocalProItemComponent', () => {
  let component: LocalProItemComponent;
  let fixture: ComponentFixture<LocalProItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalProItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

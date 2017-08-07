import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulItemComponent } from './modul-item.component';

describe('ModulItemComponent', () => {
  let component: ModulItemComponent;
  let fixture: ComponentFixture<ModulItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

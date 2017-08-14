import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulBaseinfoComponent } from './modul-baseinfo.component';

describe('ModulBaseinfoComponent', () => {
  let component: ModulBaseinfoComponent;
  let fixture: ComponentFixture<ModulBaseinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulBaseinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulBaseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

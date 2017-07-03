import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiginfoComponent } from './configinfo.component';

describe('ConfiginfoComponent', () => {
  let component: ConfiginfoComponent;
  let fixture: ComponentFixture<ConfiginfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiginfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

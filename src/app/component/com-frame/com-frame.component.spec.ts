import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComFrameComponent } from './com-frame.component';

describe('ComFrameComponent', () => {
  let component: ComFrameComponent;
  let fixture: ComponentFixture<ComFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

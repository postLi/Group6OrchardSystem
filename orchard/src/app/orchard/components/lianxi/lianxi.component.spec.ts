import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LianxiComponent } from './lianxi.component';

describe('LianxiComponent', () => {
  let component: LianxiComponent;
  let fixture: ComponentFixture<LianxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LianxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LianxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

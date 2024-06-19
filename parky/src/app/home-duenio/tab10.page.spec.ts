import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab10Page } from './tab10.page';

describe('Tab10Page', () => {
  let component: Tab10Page;
  let fixture: ComponentFixture<Tab10Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab10Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

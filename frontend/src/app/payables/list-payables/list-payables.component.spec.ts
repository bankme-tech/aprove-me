import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayablesComponent } from './list-payables.component';

describe('ListPayablesComponent', () => {
  let component: ListPayablesComponent;
  let fixture: ComponentFixture<ListPayablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPayablesComponent]
    });
    fixture = TestBed.createComponent(ListPayablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

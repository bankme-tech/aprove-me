import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayablesComponent } from './edit-payables.component';

describe('EditPayablesComponent', () => {
  let component: EditPayablesComponent;
  let fixture: ComponentFixture<EditPayablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPayablesComponent]
    });
    fixture = TestBed.createComponent(EditPayablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

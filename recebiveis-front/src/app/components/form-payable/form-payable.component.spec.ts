import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPayableComponent } from './form-payable.component';

describe('FormPayableComponent', () => {
  let component: FormPayableComponent;
  let fixture: ComponentFixture<FormPayableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPayableComponent]
    });
    fixture = TestBed.createComponent(FormPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

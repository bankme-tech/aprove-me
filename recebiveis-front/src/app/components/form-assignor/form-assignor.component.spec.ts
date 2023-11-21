import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssignorComponent } from './form-assignor.component';

describe('FormAssignorComponent', () => {
  let component: FormAssignorComponent;
  let fixture: ComponentFixture<FormAssignorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAssignorComponent]
    });
    fixture = TestBed.createComponent(FormAssignorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

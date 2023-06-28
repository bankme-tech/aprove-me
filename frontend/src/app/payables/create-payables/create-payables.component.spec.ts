import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayablesComponent } from './create-payables.component';

describe('CreatePayablesComponent', () => {
  let component: CreatePayablesComponent;
  let fixture: ComponentFixture<CreatePayablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePayablesComponent]
    });
    fixture = TestBed.createComponent(CreatePayablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

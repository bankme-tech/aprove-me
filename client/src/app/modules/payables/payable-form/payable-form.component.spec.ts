import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableFormComponent } from './payable-form.component';

describe('PayableFormComponent', () => {
  let component: PayableFormComponent;
  let fixture: ComponentFixture<PayableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayableFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

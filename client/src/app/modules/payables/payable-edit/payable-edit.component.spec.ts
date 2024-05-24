import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableEditComponent } from './payable-edit.component';

describe('PayableEditComponent', () => {
  let component: PayableEditComponent;
  let fixture: ComponentFixture<PayableEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayableEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

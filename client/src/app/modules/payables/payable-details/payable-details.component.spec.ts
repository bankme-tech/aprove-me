import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableDetailsComponent } from './payable-details.component';

describe('PayableDetailsComponent', () => {
  let component: PayableDetailsComponent;
  let fixture: ComponentFixture<PayableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayableDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

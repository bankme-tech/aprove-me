import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableListComponent } from './payable-list.component';

describe('PayableListComponent', () => {
  let component: PayableListComponent;
  let fixture: ComponentFixture<PayableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayableListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

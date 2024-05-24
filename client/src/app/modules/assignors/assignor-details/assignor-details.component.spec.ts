import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignorDetailsComponent } from './assignor-details.component';

describe('AssignorDetailsComponent', () => {
  let component: AssignorDetailsComponent;
  let fixture: ComponentFixture<AssignorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignorDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

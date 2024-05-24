import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignorFormComponent } from './assignor-form.component';

describe('AssignorFormComponent', () => {
  let component: AssignorFormComponent;
  let fixture: ComponentFixture<AssignorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

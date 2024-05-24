import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignorEditComponent } from './assignor-edit.component';

describe('AssignorEditComponent', () => {
  let component: AssignorEditComponent;
  let fixture: ComponentFixture<AssignorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignorEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

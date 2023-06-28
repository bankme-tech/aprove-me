import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignorsComponent } from './create-assignors.component';

describe('CreateAssignorsComponent', () => {
  let component: CreateAssignorsComponent;
  let fixture: ComponentFixture<CreateAssignorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAssignorsComponent]
    });
    fixture = TestBed.createComponent(CreateAssignorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

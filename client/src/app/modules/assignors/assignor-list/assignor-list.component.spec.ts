import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignorListComponent } from './assignor-list.component';

describe('AssignorListComponent', () => {
  let component: AssignorListComponent;
  let fixture: ComponentFixture<AssignorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

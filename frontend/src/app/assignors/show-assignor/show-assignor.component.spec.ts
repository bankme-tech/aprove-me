import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAssignorComponent } from './show-assignor.component';

describe('ShowAssignorComponent', () => {
  let component: ShowAssignorComponent;
  let fixture: ComponentFixture<ShowAssignorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAssignorComponent]
    });
    fixture = TestBed.createComponent(ShowAssignorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

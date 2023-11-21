import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAssignorDetailsComponent } from './card-assignor-details.component';

describe('CardAssignorDetailsComponent', () => {
  let component: CardAssignorDetailsComponent;
  let fixture: ComponentFixture<CardAssignorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAssignorDetailsComponent]
    });
    fixture = TestBed.createComponent(CardAssignorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

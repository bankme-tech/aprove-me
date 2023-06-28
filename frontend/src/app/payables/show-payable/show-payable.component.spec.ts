import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPayableComponent } from './show-payable.component';

describe('ShowPayableComponent', () => {
  let component: ShowPayableComponent;
  let fixture: ComponentFixture<ShowPayableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPayableComponent]
    });
    fixture = TestBed.createComponent(ShowPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

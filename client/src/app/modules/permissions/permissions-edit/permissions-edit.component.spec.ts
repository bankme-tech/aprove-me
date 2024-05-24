import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsEditComponent } from './permissions-edit.component';

describe('PermissionsEditComponent', () => {
  let component: PermissionsEditComponent;
  let fixture: ComponentFixture<PermissionsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

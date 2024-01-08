import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireManagementComponent } from './locataire-management.component';

describe('LocataireManagementComponent', () => {
  let component: LocataireManagementComponent;
  let fixture: ComponentFixture<LocataireManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocataireManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocataireManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

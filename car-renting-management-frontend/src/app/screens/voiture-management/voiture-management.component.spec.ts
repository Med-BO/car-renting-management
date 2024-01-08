import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureManagementComponent } from './voiture-management.component';

describe('VoitureManagementComponent', () => {
  let component: VoitureManagementComponent;
  let fixture: ComponentFixture<VoitureManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoitureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

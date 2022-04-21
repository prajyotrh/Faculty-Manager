import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDadhboardComponent } from './admin-dashboard.component';

describe('AdminDadhboardComponent', () => {
  let component: AdminDadhboardComponent;
  let fixture: ComponentFixture<AdminDadhboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDadhboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDadhboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

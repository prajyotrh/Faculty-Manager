import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDataComponent } from './trainer-data.component';

describe('TrainerDataComponent', () => {
  let component: TrainerDataComponent;
  let fixture: ComponentFixture<TrainerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

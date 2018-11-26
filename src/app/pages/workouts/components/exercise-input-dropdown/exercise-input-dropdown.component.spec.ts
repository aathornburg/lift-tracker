import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseInputDropdownComponent } from './exercise-input-dropdown.component';

describe('ExerciseInputDropdownComponent', () => {
  let component: ExerciseInputDropdownComponent;
  let fixture: ComponentFixture<ExerciseInputDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseInputDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseInputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

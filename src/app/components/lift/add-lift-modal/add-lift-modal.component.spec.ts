import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLiftModalComponent } from './add-lift-modal.component';

describe('AddLiftModalComponent', () => {
  let component: AddLiftModalComponent;
  let fixture: ComponentFixture<AddLiftModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLiftModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLiftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

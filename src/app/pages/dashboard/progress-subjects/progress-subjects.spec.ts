import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSubjects } from './progress-subjects';

describe('ProgressSubjects', () => {
  let component: ProgressSubjects;
  let fixture: ComponentFixture<ProgressSubjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressSubjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressSubjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudents } from './top-students';

describe('TopStudents', () => {
  let component: TopStudents;
  let fixture: ComponentFixture<TopStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminQuestions } from './admin-questions';

describe('AdminQuestions', () => {
  let component: AdminQuestions;
  let fixture: ComponentFixture<AdminQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestions],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminQuestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

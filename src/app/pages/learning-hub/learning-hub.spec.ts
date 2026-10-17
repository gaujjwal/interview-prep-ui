import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningHubComponent } from './learning-hub';

describe('LearningHub', () => {
  let component: LearningHubComponent;
  let fixture: ComponentFixture<LearningHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningHubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningHubComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

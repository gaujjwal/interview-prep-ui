import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-learning-hub',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './learning-hub.html',
  styleUrl: './learning-hub.css'
})
export class LearningHubComponent {

  recommendedQuestions = [
    '.NET Dependency Injection',
    'C# Async/Await',
    'Angular Route Guards',
    'Azure Blob Storage',
    'SQL Server Indexes'
  ];

  roadmapItems = [
    { title: 'C# Fundamentals', status: 'completed' },
    { title: 'OOP Concepts', status: 'completed' },
    { title: 'LINQ', status: 'completed' },
    { title: 'ASP.NET Core', status: 'inprogress' },
    { title: 'Angular', status: 'pending' },
    { title: 'Azure', status: 'pending' }
  ];

  weeklyGoals = [
    { title: 'Complete 10 Questions', completed: true },
    { title: 'Finish ASP.NET Core Module', completed: true },
    { title: 'Reach 50% Progress', completed: false },
    { title: 'Complete Azure Basics', completed: false }
  ];

  achievements = [
    'First Question Solved',
    '50 Questions Completed',
    '.NET Expert',
    'Azure Learner',
    '7-Day Learning Streak'
  ];

}
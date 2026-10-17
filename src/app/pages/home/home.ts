import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule }
from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HeroComponent } from '../../shared/hero/hero';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,RouterLink,MatProgressBarModule,MatCardModule,
    MatIconModule,MatButtonModule,MatOptionModule,MatSelectModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
totalQuestions = 0;
categories = 0;
activeUsers = 0;
successRate = 0;
companies = [
  'Microsoft',
  'Amazon',
  'Google',
  'Adobe',
  'Flipkart',
  'Walmart',
  'Infosys',
  'TCS'
];
  isDarkMode=false;
  toggleTheme() {

this.isDarkMode = !this.isDarkMode;
  }
  recommendedQuestions = [
  {
    title: '.NET Dependency Injection',
    difficulty: 'Medium'
  },
  {
    title: 'C# Async/Await',
    difficulty: 'Medium'
  },
  {
    title: 'Angular Route Guards',
    difficulty: 'Easy'
  },
  {
    title: 'Azure Blob Storage',
    difficulty: 'Medium'
  },
  {
    title: 'SQL Server Indexes',
    difficulty: 'Hard'
  }
];
  startCounter(
  property: 'totalQuestions' |
            'categories' |
            'activeUsers' |
            'successRate',
  target: number,
  speed: number
) {

  const interval = setInterval(() => {

    this[property] += Math.ceil(target / 100);

    if (this[property] >= target) {

      this[property] = target;

      clearInterval(interval);

    }

  }, speed);

}
roadmapItems = [
  {
    title: 'C# Fundamentals',
    status: 'completed'
  },
  {
    title: 'OOP Concepts',
    status: 'completed'
  },
  {
    title: 'LINQ',
    status: 'completed'
  },
  {
    title: 'Entity Framework Core',
    status: 'completed'
  },
  {
    title: 'ASP.NET Core',
    status: 'inprogress'
  },
  {
    title: 'Angular',
    status: 'pending'
  },
  {
    title: 'Azure',
    status: 'pending'
  },
  {
    title: 'Microservices',
    status: 'pending'
  },
  {
    title: 'System Design',
    status: 'pending'
  }
];
weeklyGoals = [
  {
    title: 'Complete 10 Questions',
    completed: true
  },
  {
    title: 'Finish ASP.NET Core Module',
    completed: true
  },
  {
    title: 'Reach 50% Progress',
    completed: false
  },
  {
    title: 'Complete Azure Basics',
    completed: false
  }
];
}
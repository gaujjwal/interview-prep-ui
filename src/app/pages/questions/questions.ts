import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question.service';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../../services/progress.service';
import { jwtDecode } from 'jwt-decode';
import { CategoryService } from '../../services/category.services';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './questions.html',
  styleUrl: './questions.css'
})
export class QuestionsComponent implements OnInit {

  questions: any[] = [];
 searchText = '';
 categories: any[] = [];

selectedCategory = '';
  constructor(
    private questionService: QuestionService,
    private progressService: ProgressService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.loadQuestions();
    this.questionService
      .getQuestions()
      .subscribe({
        next: (data) => {

          console.log(data);

          this.questions = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.loadQuestions();

this.categoryService
  .getCategories()
  .subscribe(data => {

    this.categories = data;
  });
  }
  markComplete(questionId: number) {

  const token = localStorage.getItem('token');

  if (!token) {
    return;
  }

  const decoded: any = jwtDecode(token);

  const model = {
    userId: decoded.nameid,
    questionId: questionId,
    isCompleted: true
  };

  this.progressService
    .saveProgress(model)
    .subscribe(() => {

      alert('Question marked completed');
    });
}
loadQuestions() {

  console.log(this.selectedCategory);

  if (!this.selectedCategory) {

    this.questionService
      .getQuestions()
      .subscribe(data => {

        this.questions = data;
      });

    return;
  }

  this.questionService
    .getQuestionsByCategory(this.selectedCategory)
    .subscribe(data => {

      this.questions = data;
    });
}
filterQuestions() {

  this.questionService
    .getFilteredQuestions(
      this.selectedCategory,
      this.searchText
    )
    .subscribe({
      next: (data) => {

        console.log('Filtered Data:', data);

        this.questions = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.html',
  styleUrl: './progress.css'
})
export class ProgressComponent implements OnInit {

  progressItems: any[] = [];

  constructor(
    private progressService: ProgressService
  ) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    const decoded: any = jwtDecode(token);

    const userId = decoded.nameid;

    this.progressService
      .getProgress(userId)
      .subscribe(data => {

        this.progressItems = data;
      });
  }
}
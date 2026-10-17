import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class DashboardComponent implements OnInit {

  dashboard: any;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    const decoded: any = jwtDecode(token);

    const userId = decoded.nameid;

    this.dashboardService
      .getDashboard(userId)
      .subscribe(data => {

        this.dashboard = data;
      });
  }
  logout(): void {
 
localStorage.removeItem('token');
 
this.router.navigate(['/login']);
}
}

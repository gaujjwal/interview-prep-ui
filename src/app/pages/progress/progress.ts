import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { ProgressService } from '../../services/progress.service';
import { ProgressItem } from '../../models/Progress/progress-item.model';
import { ProgressStatus } from '../../models/Progress/progress-status.model';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.html',
  styleUrl: './progress.css'
})
export class ProgressComponent implements OnInit {

  private readonly progressService = inject(ProgressService);

  readonly progressItems = signal<ProgressItem[]>([]);

  readonly completedCount = computed(() =>
    this.progressItems()
      .filter(x => x.status === ProgressStatus.Completed)
      .length
  );

  readonly inProgressCount = computed(() =>
    this.progressItems()
      .filter(x => x.status === ProgressStatus.InProgress)
      .length
  );

  ngOnInit(): void {
    // User comes from the JWT on the API side
    this.progressService
      .getMyProgress()
      .subscribe(data => this.progressItems.set(data));
  }

  statusLabel(status: ProgressStatus): string {
    switch (status) {
      case ProgressStatus.Completed:
        return 'Completed';
      case ProgressStatus.InProgress:
        return 'In progress';
      default:
        return 'Not started';
    }
  }
}
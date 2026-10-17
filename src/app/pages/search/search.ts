import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { SearchService } from '../../services/search.service';

import { SearchOption } from '../../models/search/search-option.model';
import { ExperienceLevelOption } from '../../models/search/experience-level-option.model';
import { SearchQuestionsRequest } from '../../models/search/search-questions-request.model';
import { SearchQuestionResult } from '../../models/search/search-question-result.model';


@Component({
  selector: 'app-search',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatChipsModule,
    MatCardModule
  ],

  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit {

  private readonly searchService = inject(SearchService);

  private readonly snackBar = inject(MatSnackBar);


  // Dropdown data (signals)
  readonly roles = signal<SearchOption[]>([]);

  readonly experienceLevels = signal<ExperienceLevelOption[]>([]);

  readonly skills = signal<SearchOption[]>([]);

  readonly companies = signal<SearchOption[]>([]);


  // Selected filter values (plain fields are fine here —
  // these only change via template event bindings like ngModel,
  // which zoneless Angular already tracks correctly)
  selectedRoleId: number | null = null;

  selectedExperienceLevelId: number | null = null;

  selectedSkillIds: number[] = [];

  selectedCompanyId: number | null = null;


  // Loading states (signals)
  readonly isLoadingRoles = signal(false);

  readonly isLoadingExperienceLevels = signal(false);

  readonly isLoadingSkills = signal(false);

  readonly isLoadingCompanies = signal(false);


  // Search execution state (signals)
  readonly isSearching = signal(false);

  readonly hasSearched = signal(false);

  readonly searchResults = signal<SearchQuestionResult[]>([]);

  readonly totalCount = signal(0);
readonly isLoadingFilters = computed(() =>
  this.isLoadingRoles() ||
  this.isLoadingExperienceLevels() ||
  this.isLoadingSkills() ||
  this.isLoadingCompanies()
);

  ngOnInit(): void {
    this.loadRoles();
    this.loadExperienceLevels();
    this.loadSkills();
    this.loadCompanies();
  }


 private loadRoles(): void {
  this.isLoadingRoles.set(true);

  this.searchService.getRoles().subscribe({
    next: (roles) => {
      this.roles.set(roles);
      this.isLoadingRoles.set(false);
    },
    error: () => {
      this.isLoadingRoles.set(false);
      this.snackBar.open(
        'Could not load roles. Please refresh the page.',
        'Close',
        { duration: 4000 }
      );
    }
  });
}


  private loadExperienceLevels(): void {
    this.isLoadingExperienceLevels.set(true);

    this.searchService.getExperienceLevels().subscribe({
      next: (levels) => {
        this.experienceLevels.set(levels);
        this.isLoadingExperienceLevels.set(false);
      },
      
      error: () => {
  this.isLoadingExperienceLevels.set(false);
  this.snackBar.open(
    'Could not load experience levels. Please refresh the page.',
    'Close',
    { duration: 4000 }
  );
}
    });
  }


  private loadSkills(): void {
    this.isLoadingSkills.set(true);

    this.searchService.getSkills().subscribe({
      next: (skills) => {
        this.skills.set(skills);
        this.isLoadingSkills.set(false);
      },
      error: () => {
  this.isLoadingSkills.set(false);
  this.snackBar.open(
    'Could not load skills. Please refresh the page.',
    'Close',
    { duration: 4000 }
  );
}
    });
  }


  private loadCompanies(): void {
    this.isLoadingCompanies.set(true);

    this.searchService.getCompanies().subscribe({
      next: (companies) => {
        this.companies.set(companies);
        this.isLoadingCompanies.set(false);
      },
      error: () => {
  this.isLoadingCompanies.set(false);
  this.snackBar.open(
    'Could not load companies. Please refresh the page.',
    'Close',
    { duration: 4000 }
  );
}
    });
  }


  // =========================================
  // SEARCH EXECUTION
  // =========================================

  hasAtLeastOneFilter(): boolean {
    return (
      this.selectedRoleId !== null ||
      this.selectedExperienceLevelId !== null ||
      this.selectedSkillIds.length > 0 ||
      this.selectedCompanyId !== null
    );
  }


  onSearch(): void {

    if (!this.hasAtLeastOneFilter()) {
      this.snackBar.open(
        'Please select at least one filter before searching.',
        'Close',
        { duration: 3500 }
      );
      return;
    }

    const request: SearchQuestionsRequest = {
      roleId: this.selectedRoleId,
      experienceLevelId: this.selectedExperienceLevelId,
      skillIds: this.selectedSkillIds,
      companyId: this.selectedCompanyId
    };

    this.isSearching.set(true);
    this.hasSearched.set(false);

    this.searchService.searchQuestions(request).subscribe({
      next: (response) => {
        this.searchResults.set(response.questions);
        this.totalCount.set(response.totalCount);
        this.isSearching.set(false);
        this.hasSearched.set(true);
      },
      error: (err) => {
        this.isSearching.set(false);
        this.hasSearched.set(true);
        this.searchResults.set([]);
        this.totalCount.set(0);

        const message =
          err?.error?.message ??
          'Something went wrong while searching. Please try again.';

        this.snackBar.open(message, 'Close', { duration: 4000 });
      }
    });
  }


  onClearFilters(): void {
    this.selectedRoleId = null;
    this.selectedExperienceLevelId = null;
    this.selectedSkillIds = [];
    this.selectedCompanyId = null;

    this.searchResults.set([]);
    this.totalCount.set(0);
    this.hasSearched.set(false);
  }
}
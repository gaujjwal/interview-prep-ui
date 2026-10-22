import { Routes } from '@angular/router';
import { CompaniesComponent } from './pages/companies/companies';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { QuestionsComponent } from './pages/questions/questions';
import { ProgressComponent } from './pages/progress/progress';
import { authGuard } from './guards/auth-guard';
import { AdminQuestionsComponent } from './pages/admin-questions/admin-questions';
import { HomeComponent } from './pages/home/home';
import { LayoutComponent } from './shared/layout/layout';
import { LearningHubComponent } from './pages/learning-hub/learning-hub';
import { SearchComponent } from './pages/search/search';
import { PrivacyComponent } from './pages/privacy/privacy';
import { TermsComponent } from './pages/terms/terms';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },

      {
        path: 'home',
        component: HomeComponent
      },

      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'register',
        component: RegisterComponent
      },

      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
      },

      {
        path: 'questions',
        component: QuestionsComponent,
        canActivate: [authGuard]
      },

      {
        path: 'progress',
        component: ProgressComponent,
        canActivate: [authGuard]
      },

      {
        path: 'admin-questions',
        component: AdminQuestionsComponent,
        canActivate: [authGuard]
      },
      {
  path: 'privacy',
  component: PrivacyComponent
},
      {
  path: 'learning-hub',
  component: LearningHubComponent,
  canActivate: [authGuard]
},
{
  path: 'companies',
  component: CompaniesComponent,
  canActivate: [authGuard]
},
{
  path: 'search',
  component: SearchComponent,
  canActivate: [authGuard] // use your existing guard name
},{
  path: 'terms',
  component: TermsComponent
}

    ]
  }
];
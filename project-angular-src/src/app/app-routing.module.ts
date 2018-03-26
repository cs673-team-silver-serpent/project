import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'projectSearch', component: ProjectSearchComponent},
  { path: 'home', component: HomeComponent},
  { path: 'addProject', component: AddProjectComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'viewProject', component: ViewProjectComponent},
  {path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

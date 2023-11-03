import { ProfileAdministratorComponent } from './components/administrator/profile-administrator/profile-administrator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { SupportsAdministratorComponent } from './components/administrator/supports-administrator/supports-administrator.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'administrator',
    component: AdministratorComponent,
    children: [
      {
        path: 'profile',
        component: ProfileAdministratorComponent,
      },
      {
        path: 'supports',
        component: SupportsAdministratorComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

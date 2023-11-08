import { ListMoviesAdministratorComponent } from './components/administrator/list-movies-administrator/list-movies-administrator.component';
import { ListUsersAdministratorComponent } from './components/administrator/list-users-administrator/list-users-administrator.component';
import { ProfileAdministratorComponent } from './components/administrator/profile-administrator/profile-administrator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { SupportsAdministratorComponent } from './components/administrator/supports-administrator/supports-administrator.component';
import { CreaeditaUsersAdministratorComponent } from './components/administrator/creaedita-users-administrator/creaedita-users-administrator.component';

import { ClientComponent } from './components/client/client.component';
import { ListMoviesClientComponent } from './components/client/list-movies-client/list-movies-client.component';
import { CreaeditaMoviesAdministratorComponent } from './components/administrator/creaedita-movies-administrator/creaedita-movies-administrator.component';
import { DetailsMoviesClientComponent } from './components/client/details-movies-client/details-movies-client.component';

const routes: Routes = [
  {
    path: 'home',component: HomeComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register',component: RegisterComponent,
  },
  {
    path: 'administrator/:id',component: AdministratorComponent,children: [
      {
        path: 'profile',component: ProfileAdministratorComponent,
      },
      {
        path: 'supports',component: SupportsAdministratorComponent,
      },{
        path:'list-users',component:ListUsersAdministratorComponent
      },{
        path:'ediciones-users/:id',component:CreaeditaUsersAdministratorComponent
      }
      ,{
        path:'list-movies',component:ListMoviesAdministratorComponent
      },
      {
        path:'nuevo-movies',component:CreaeditaMoviesAdministratorComponent
      }
      ,{
        path:'ediciones-movies/:id',component:CreaeditaMoviesAdministratorComponent
      }
    ],

  },
  {
    path: 'cliente',component: ClientComponent,children: [
      {
        path:'home',component: ListMoviesClientComponent,
      },
      {
        path:'movie-detail/:id',component: DetailsMoviesClientComponent,
      }
      
    ]

  },{
    path:"",redirectTo:'home',pathMatch:"full"

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

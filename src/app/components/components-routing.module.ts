import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorComponent } from './administrator/administrator.component';
import { ProfileAdministratorComponent } from './administrator/profile-administrator/profile-administrator.component';
import { RouterModule,Routes } from '@angular/router';
import { SupportsAdministratorComponent } from './administrator/supports-administrator/supports-administrator.component';
import { ListUsersAdministratorComponent } from './administrator/list-users-administrator/list-users-administrator.component';
import { CreaeditaUsersAdministratorComponent } from './administrator/creaedita-users-administrator/creaedita-users-administrator.component';
import { ListMoviesAdministratorComponent } from './administrator/list-movies-administrator/list-movies-administrator.component';
import { CreaeditaMoviesAdministratorComponent } from './administrator/creaedita-movies-administrator/creaedita-movies-administrator.component';
import { ClientComponent } from './client/client.component';
import { ProfileClientComponent } from './client/profile-client/profile-client.component';
import { SupportsClientComponent } from './client/supports-client/supports-client.component';
import { ListMoviesClientComponent } from './client/list-movies-client/list-movies-client.component';
import { ViewMoviesClientComponent } from './client/view-movies-client/view-movies-client.component';
import { FavoritesMoviesClientComponent } from './client/favorites-movies-client/favorites-movies-client.component';
import { GuardService } from '../services/guard.service';
import { ReportsAdministratorComponent } from './administrator/reports-administrator/reports-administrator.component';
import { Report01Component } from './administrator/reports-administrator/report01/report01.component';
import { Report02Component } from './administrator/reports-administrator/report02/report02.component';
import { Report03Component } from './administrator/reports-administrator/report03/report03.component';
const routes: Routes = [
  {//
    //protege a todo este grupo de rutas osea activa y desactiva las rutas
    canActivate: [GuardService], //llamo al guard.service DENTRO DEL COMPONENT-ROUTING MODULE protege estas rutas
    path: 'administrator/:id',
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
      {
        path: 'list-users',
        component: ListUsersAdministratorComponent,
      },
      {
        path: 'ediciones-users/:id',
        component: CreaeditaUsersAdministratorComponent,
      },
      {
        path: 'list-movies',
        component: ListMoviesAdministratorComponent,
      },
      {
        path: 'nuevo-movies',
        component: CreaeditaMoviesAdministratorComponent,
      },
      {
        path: 'ediciones-movies/:id',
        component: CreaeditaMoviesAdministratorComponent,
      },{
        path:'reports',
        component:ReportsAdministratorComponent,children:[
          {
            path:'report01',component:Report01Component
          },
          {
            path:'report02',component:Report02Component
          },
          {
            path:'report03',component:Report03Component
          }
        ]
      }
    ],
  },
  {
    canActivate: [GuardService],//protege a todo este grupo de rutas
    path: 'client/:id',
    component: ClientComponent,
    children: [
      {
        path: 'profile',
        component: ProfileClientComponent,
      },
      {
        path: 'supports',
        component: SupportsClientComponent,
      },
      {
        path: 'list-movies',
        component: ListMoviesClientComponent,
      },
      {
        path: 'view-movies/:id',
        component: ViewMoviesClientComponent,
      },
      {
        path: 'favorites',
        component: FavoritesMoviesClientComponent,
      }
    ],
  },
];

@NgModule({
 //Esto va y se copia
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}

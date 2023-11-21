import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorComponent } from './administrator/administrator.component';
import { ClientComponent } from './client/client.component';
import { ProfileAdministratorComponent } from './administrator/profile-administrator/profile-administrator.component';
import { SupportsAdministratorComponent } from './administrator/supports-administrator/supports-administrator.component';
import { ListUsersAdministratorComponent } from './administrator/list-users-administrator/list-users-administrator.component';
import { CreaeditaUsersAdministratorComponent } from './administrator/creaedita-users-administrator/creaedita-users-administrator.component';
import { ListMoviesAdministratorComponent } from './administrator/list-movies-administrator/list-movies-administrator.component';
import { CreaeditaMoviesAdministratorComponent } from './administrator/creaedita-movies-administrator/creaedita-movies-administrator.component';
import { TableAdminComponent } from './administrator/list-users-administrator/table-admin/table-admin.component';
import { TableClientComponent } from './administrator/list-users-administrator/table-client/table-client.component';
import { ListMoviesClientComponent } from './client/list-movies-client/list-movies-client.component';
import { SupportsClientComponent } from './client/supports-client/supports-client.component';
import { ViewMoviesClientComponent } from './client/view-movies-client/view-movies-client.component';
import { ProfileClientComponent } from './client/profile-client/profile-client.component';
import { FavoritesMoviesClientComponent } from './client/favorites-movies-client/favorites-movies-client.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentsRoutingModule } from './components-routing.module';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { ReportsAdministratorComponent } from './administrator/reports-administrator/reports-administrator.component';
import { Report01Component } from './administrator/reports-administrator/report01/report01.component';
import { NgChartsModule } from 'ng2-charts';
import { Report02Component } from './administrator/reports-administrator/report02/report02.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Report03Component } from './administrator/reports-administrator/report03/report03.component';
@NgModule({//
  declarations: [
    AdministratorComponent,
    ClientComponent,
    ProfileAdministratorComponent,
    SupportsAdministratorComponent,
    ListUsersAdministratorComponent,
    CreaeditaUsersAdministratorComponent,
    ListMoviesAdministratorComponent,
    CreaeditaMoviesAdministratorComponent,
    TableAdminComponent,
    TableClientComponent,
    ListMoviesClientComponent,
    SupportsClientComponent,
    ViewMoviesClientComponent,
    ProfileClientComponent,
    FavoritesMoviesClientComponent,
    ReportsAdministratorComponent,
    Report01Component,
    Report02Component,
    Report03Component,
  ],
  imports: [
    CommonModule,
    RouterModule, //me causaba problema sino lo importo es para el routerLink[]
    ComponentsRoutingModule, //es el ts que esta pegado arriba

    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,

    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatSnackBarModule,
    NgChartsModule,
    MatExpansionModule,
    MatSlideToggleModule

  ],
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { ClientComponent } from './components/client/client.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileAdministratorComponent } from './components/administrator/profile-administrator/profile-administrator.component';
import { SupportsAdministratorComponent } from './components/administrator/supports-administrator/supports-administrator.component';
import { ListUsersAdministratorComponent } from './components/administrator/list-users-administrator/list-users-administrator.component';

import { MatChipsModule} from '@angular/material/chips';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdministratorComponent,
    ClientComponent,
    ProfileAdministratorComponent,
    SupportsAdministratorComponent,
    ListUsersAdministratorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,


    
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
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

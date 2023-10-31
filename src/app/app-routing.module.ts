import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { ViejoComponent } from './components/viejo/viejo.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
path:'home',component:HomeComponent
  },
  {
    path:'nuevo',component:NuevoComponent
  },
  {
    path:'viejo',component:ViejoComponent
  },
  {
    path:'',redirectTo:'home',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

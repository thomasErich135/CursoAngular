import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const homeroutes: Routes = [
    { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(homeroutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

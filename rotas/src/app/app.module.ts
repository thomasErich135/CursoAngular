import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';

import { AuthService } from './home/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent, 
    NotFoundComponent
  ],
  imports: [
    BrowserModule,    
    FormsModule,    
    HomeModule,    
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

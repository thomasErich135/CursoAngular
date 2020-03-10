import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found/not-found.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotFoundComponent,
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NotFoundComponent,
    AlertModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }

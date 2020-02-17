import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found/not-found.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    AlertModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotFoundComponent,
    AlertModalComponent
  ],
  entryComponents: [
    AlertModalComponent
  ]
})
export class SharedModule { }

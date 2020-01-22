import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DropdownService } from './services/dropdown.service';

import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  declarations: [
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FormDebugComponent
  ],
  providers: []
})
export class SharedModule { }

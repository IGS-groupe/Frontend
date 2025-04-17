// account.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { PdfViewerComponent } from './auth/pdf-viewer/pdf-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule
    // Do not import AuthModule here because it's lazy-loaded
  ],
  declarations: [
    PdfViewerComponent
  ]
})
export class AccountModule { }

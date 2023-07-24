import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './Edit/edit-dialog/edit-dialog.component';
import { DataService } from './services/data.service';
import { AddDialogComponent } from './add/add.dialog.component';
import { OnlyNumber } from './only-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditDialogComponent,
    AddDialogComponent,
    OnlyNumber
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [DataService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }

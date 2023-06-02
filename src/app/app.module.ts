import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateusersComponent } from './components/updateusers/updateusers.component';
import { ViewSpendingsComponent } from './components/view-spendings/view-spendings.component';
import { AddSpendingsComponent } from './components/add-spendings/add-spendings.component';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';

registerLocaleData(localeTr, 'tr'); 

@NgModule({
  declarations: [
    AppComponent,
    ViewUsersComponent,
    AddUsersComponent,
    UpdateusersComponent,
    ViewSpendingsComponent,
    AddSpendingsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule 
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'tr' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

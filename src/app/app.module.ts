import { NgModule } from '@angular/core';
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
import { SpendingService } from 'src/services/spending.service';



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

  bootstrap: [AppComponent]
})
export class AppModule { }

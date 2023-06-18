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
import { HomeComponent } from './components/home/home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { MonthlySpendingComponent } from './components/monthly-spending/monthly-spending.component';
import { SpendingTypeComponent } from './components/spending-type/spending-type.component';
import { BillingTypeComponent } from './components/billing-type/billing-type.component';



registerLocaleData(localeTr, 'tr'); 

@NgModule({
  declarations: [
    AppComponent,
    ViewUsersComponent,
    AddUsersComponent,
    UpdateusersComponent,
    ViewSpendingsComponent,
    AddSpendingsComponent,
    HomeComponent,
    MonthlySpendingComponent,
    SpendingTypeComponent,
    BillingTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    NgChartsModule,
    HighchartsChartModule,
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'tr' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { UpdateusersComponent } from './components/updateusers/updateusers.component';
import { ViewSpendingsComponent } from './components/view-spendings/view-spendings.component';
import { AddSpendingsComponent } from './components/add-spendings/add-spendings.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: ViewUsersComponent },
  { path: 'users/add', component: AddUsersComponent },
  { path: 'update/:id', component: UpdateusersComponent },
  { path: 'spendings', component: ViewSpendingsComponent },
  { path: 'spendings/add', component: AddSpendingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

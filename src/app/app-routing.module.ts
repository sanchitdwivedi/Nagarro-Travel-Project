import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { ForgotComponent } from './forgot/forgot.component';
import { TicketComponent } from './ticket/ticket.component';
import { NewTicketComponent } from './ticket/New-Ticket/new-ticket/new-ticket.component';
import { TicketConfirmationComponent } from './ticket/ticket-confirmation/ticket-confirmation.component';
import { TicketDetailsComponent } from './ticket/ticket-details/ticket-details.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { DetailsComponent } from './admin/details/details.component';
import { EditTicketComponent } from './ticket/edit-ticket/edit-ticket.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'forgot', component: ForgotComponent},
  {path: 'home/tickets', component: TicketComponent, canActivate: [AuthGuard]},
  {path: 'home/newTicket', component: NewTicketComponent, canActivate: [AuthGuard]},
  {path: 'home/newTicket/confirm', component: TicketConfirmationComponent, canActivate: [AuthGuard]},
  {path: 'home/tickets/details', component: TicketDetailsComponent, canActivate: [AuthGuard]},
  {path: 'home/tickets/edit', component: EditTicketComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminLoginComponent },
  { path: 'admin/home', component: AdminHomeComponent},
  { path: 'admin/home/details', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

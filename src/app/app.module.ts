import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { ForgotComponent } from './forgot/forgot.component';
import { TicketComponent } from './ticket/ticket.component';
import { NewTicketComponent } from './ticket/New-Ticket/new-ticket/new-ticket.component';
import { TicketConfirmationComponent } from './ticket/ticket-confirmation/ticket-confirmation.component';
import { TicketDetailsComponent } from './ticket/ticket-details/ticket-details.component';
import { DatePipe } from '@angular/common';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { DetailsComponent } from './admin/details/details.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EditTicketComponent } from './ticket/edit-ticket/edit-ticket.component';
import { MenuComponent } from './admin/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    UserComponent,
    ForgotComponent,
    TicketComponent,
    NewTicketComponent,
    TicketConfirmationComponent,
    TicketDetailsComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    DetailsComponent,
    EditTicketComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

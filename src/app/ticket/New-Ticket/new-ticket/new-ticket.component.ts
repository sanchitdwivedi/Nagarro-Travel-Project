import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { TicketsService } from 'src/app/tickets.service';
import { User } from 'src/app/user';
import { Ticket } from 'src/app/Ticket';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  userId: number;
  isLoggedIn = false;
  ticket = new Ticket();
  msg = ''

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService : UserService,
    private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    // console.log('Logged in ->' + this.isLoggedIn);
    if(!this.isLoggedIn){
      this.router.navigate(['/login'])
    }
    this.ticketService.getUserTicketById('ticketId').subscribe(
      data => {
        this.ticket = data;
      }
    )
  }

  createTicket(f: NgForm){

    this.getFormElements(f);

    if(sessionStorage.getItem('ticketId')){
      this.updateTicket();
    }
    else{
      this.ticketService.createUserTicket(this.ticket).subscribe(
      data => {
        // console.log(data)
        // console.log("response recieved"),
        // this.router.navigate(['/user'])
        this.ticketService.setCurrentTicketId(data.ticketNo);
        this.msg = 'Ticket created'
        this.router.navigate(['/home/newTicket/confirm'])
      },
      error => {
        // console.log(error)
        // console.log("exception occured");
        this.msg = 'Error while creating ticket please try again';
      }
      )  
    }       
    
  }

  public updateTicket(){
    this.ticketService.updateUserTicket('ticketId', this.ticket).subscribe(
      data => {
        this.msg = 'Ticket created'
        this.router.navigate(['/home/newTicket/confirm'])
      }
    ),
    error => {
      // console.log(error)
      // console.log("exception occured");
      this.msg = 'Error while updating ticket please try again';
    }
  }

  public getFormElements(f: NgForm){
    this.ticket.requestType = f.value.requestType
    this.ticket.priority = f.value.priority
    this.ticket.travelCity = f.value.travelCity
    this.ticket.fromLocation = f.value.fromLocation
    this.ticket.startDate = f.value.startDate
    this.ticket.endDate = f.value.endDate
    this.ticket.passportNo = f.value.passportNo
    this.ticket.projectName = f.value.projectName
    this.ticket.expenseBornBy = f.value.expenseBornBy        // change later
    this.ticket.travelApproverName = f.value.travelApproverName
    this.ticket.expectedDuration = f.value.expectedDuration
    this.ticket.maxAllowedAmount = f.value.maxAllowedAmount
    this.ticket.additionalDetails = f.value.additionalDetails
    this.ticket.submitDate = new Date()
    this.ticket.status = "Submitted"
  }
}

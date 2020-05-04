import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/Ticket';
import { TicketsService } from 'src/app/tickets.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {

  ticket: Ticket
  msg = ''

  constructor(private ticketService: TicketsService,
    private router: Router) { }

  ngOnInit(): void {
    this.ticketService.getUserTicketById('clickedTicketId').subscribe(
      data => {
        this.ticket = data;
      },
      error => {
        console.log(error)
      }
    )
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
    this.ticket.expenseBornBy = f.value.expenseBornBy
    this.ticket.travelApproverName = f.value.travelApproverName
    this.ticket.expectedDuration = f.value.expectedDuration
    this.ticket.maxAllowedAmount = f.value.maxAllowedAmount
    this.ticket.additionalDetails = f.value.additionalDetails
    this.ticket.submitDate = new Date()
  }

  public editTicket(f: NgForm) {
    this.getFormElements(f)
    if(this.ticket.status === 'Approved' || this.ticket.status === 'Rejected'){
      this.ticket.status = 'Re-Submitted'
    }
    this.ticketService.updateUserTicket('clickedTicketId', this.ticket).subscribe(
      data => {
        this.msg = 'Ticket updated successfully'
        this.router.navigateByUrl('home/tickets/details')
      },
      error => {
        console.log(error)
        this.msg = 'An error has occured! Please try again'
      }
    )
  }

}

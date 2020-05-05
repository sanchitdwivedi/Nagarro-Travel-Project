import { Component, OnInit } from '@angular/core';
import { Ticket } from '../Ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  userId: number;
  isLoggedIn = false;
  tickets: Array<Ticket>;
  page: number = 0;
  pageSize: number = 5;
  pages: Array<number>

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService : UserService,
    private ticketService: TicketsService) { }

  setPage(i: number, event: any) {
    event.preventDefault();
    this.page=i;
    this.getTickets();
  }

  ngOnInit(): void {
    this.getTickets();
    
  }

  getTickets(){
    this.ticketService.getUserTickets(this.page, this.pageSize).subscribe(
      data => {
        this.tickets = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      error => {
        console.log(error)
        this.router.navigate(['/login'])
      }
    )

  }

  ticketClick(ticket: Ticket){
    this.ticketService.setClickedTickedId(ticket.ticketNo)
    this.router.navigate(['/home/tickets/details'])
  }

}

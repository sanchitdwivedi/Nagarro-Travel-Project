import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Ticket } from 'src/app/Ticket';
import { TicketsService } from 'src/app/tickets.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  displayedColumns: string[] = ['ticketId', 'priority', 'userName', 'submitDate', 'projectName', 'travelCity', 'status', 'user.businessUnit'];
  dataSource: MatTableDataSource<Ticket>;
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  tickets: Array<Ticket>;
  userIds: Array<number> = [];

  constructor(private ticketService: TicketsService,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.showTickets();
  }

  public showTickets(){
    this.ticketService.getAllTickets().subscribe(
      data => {
        this.tickets = data.filter(
          ticket => {
            return (ticket.status === 'Submitted' || ticket.status === 'Re-Submitted' || ticket.status === 'In Process')
          }
        );
      },
      error => {
        console.log(error)
      },
      () => {
        this.dataSource = new MatTableDataSource(this.tickets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item:Ticket, property) => {
          switch(property) {
            case 'user.businessUnit': return item.user.businessUnit;
            case 'priority': {
              if(item.priority == 'Immediate') return 1;
              if(item.priority == 'Urgent') return 0;
              if(item.priority == 'Normal') return -1;
            }
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
 
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return key === 'user' ? currentTerm + data.user.businessUnit : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
      }
    )
      }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openTicket(ticket: Ticket){
    this.adminService.setClickedTicketId(ticket.ticketNo)
    this.router.navigate(['/admin/home/details']);
  }

}

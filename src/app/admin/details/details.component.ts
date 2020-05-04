import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/Ticket';
import { TicketsService } from 'src/app/tickets.service';
import { NgForm } from '@angular/forms';
import { UploadFileService } from 'src/app/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  ticket: Ticket
  updatedStatus = 'In Process'
  selectedFiles: FileList;  
  currentFile: File;

  constructor(private adminService: AdminService,
    private router: Router,
    private ticketService: TicketsService,
    private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
    this.showTicketDetails()
  }

  public showTicketDetails(){
    this.ticketService.getTicketById().subscribe(
      data => {
        this.ticket = data;
      },
      error => {
        console.log(error)
        this.router.navigate['admin/home']
      }
    )
  }

  public updateTicketDetails(f: NgForm){
    if(f.value.updatedStatus !== ''){
      this.ticket.status = f.value.updatedStatus
    }
    if(f.value.updatedComment !== ''){
      this.ticket.commentByAdmin = f.value.updatedComment
    }
    this.ticketService.updateUserTicket('selectedTicketId', this.ticket).subscribe(
      data => {
        console.log(data)
        sessionStorage.removeItem('selectedTicketId')
        this.router.navigateByUrl('/admin/home');
      },
      error => {
        console.log(error)
      }
    )
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
  
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile)
    this.uploadFileService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Uploading')
        } else if (event instanceof HttpResponse) {
          console.log('Failed')
        }
      },
      err => {
        console.log(err)
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }

}

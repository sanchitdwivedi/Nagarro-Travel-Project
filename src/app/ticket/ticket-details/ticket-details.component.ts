import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/tickets.service';
import { Ticket } from 'src/app/Ticket';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/upload-file.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  msg = ''
  ticket: Ticket;
  uploadedFiles: Array<File>= [];

  constructor(private ticketService: TicketsService,
    private router: Router,
    private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
    this.getClickedTicketDetails();
  }

  public getClickedTicketDetails(){
    this.ticketService.getUserTicketById('clickedTicketId').subscribe(
      data => {
        this.ticket = data;
        this.uploadFileService.getFiles(data.ticketNo).subscribe(
          data => {
            this.uploadedFiles = data;
          },
          error => {
            console.log(error)
          }
        )
      },
      error => {
        console.log(error)
      }
    )
  }

  public editTicket(){
    if(this.ticket.status === 'In Process'){
      this.msg = 'Cannot edit when status is In Process'
    }
    else {
      
      this.router.navigateByUrl('/home/tickets/edit')
    }
  }

  public download(fileDownload: any){
    const byteString = atob(fileDownload.data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
     int8Array[i] = byteString.charCodeAt(i);
   }
    const file = new Blob([int8Array], {type: fileDownload.fileType});
    saveAs(file, fileDownload.fileName);
  }

}

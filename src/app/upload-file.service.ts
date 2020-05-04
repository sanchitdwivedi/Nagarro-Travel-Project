import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  selectedTicketId: number;

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    this.selectedTicketId = JSON.parse(sessionStorage.getItem('selectedTicketId')).ticketId;
    const req = new HttpRequest('POST', `http://localhost:8080/api/tickets/${this.selectedTicketId}/uploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  public getFiles(ticketId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/tickets/${ticketId}/uploadedFile`);
  }
  
}

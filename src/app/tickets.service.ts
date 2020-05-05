import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  currentUserId: number
  currentTicketId: number;
  clickedTicketId: number;
  adminClickedTicket: number;

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private _http : HttpClient) { }

  public getAllTickets(): Observable<any>{
    return this._http.get('http://localhost:8080/api/tickets')
  }

  public getTicketById(): Observable<any> {
    this.adminClickedTicket = JSON.parse(sessionStorage.getItem('selectedTicketId')).ticketId;
    return this._http.get(`http://localhost:8080/api/tickets/${this.adminClickedTicket}`)
  }

  public getUserTickets(page: number, pageSize: number): Observable<any>{
    this.currentUserId = JSON.parse(sessionStorage.getItem('id')).userId;
    return this._http.get(`http://localhost:8080/api/users/${this.currentUserId}/tickets?page=${page}&size=${pageSize}`);
  }

  public createUserTicket(ticket: Ticket): Observable<any>{
    this.currentUserId = JSON.parse(sessionStorage.getItem('id')).userId;
    return this._http.post(`http://localhost:8080/api/users/${this.currentUserId}/tickets`, ticket);
  }

  public getUserTicketById(requestType: string): Observable<any>{
    this.currentUserId = JSON.parse(sessionStorage.getItem('id')).userId;
    this.currentTicketId = JSON.parse(sessionStorage.getItem(requestType)).ticketId;
    return this._http.get(`http://localhost:8080/api/users/${this.currentUserId}/tickets/${this.currentTicketId}`);
  }

  public updateUserTicket(requestType: string, ticket: Ticket): Observable<any>{
    this.currentUserId = ticket.user.userId
    this.currentTicketId = JSON.parse(sessionStorage.getItem(requestType)).ticketId;
    return this._http.put(`http://localhost:8080/api/users/${this.currentUserId}/tickets/${this.currentTicketId}`, ticket);
  }

  public setCurrentTicketId(ticketId: number){
    sessionStorage.setItem('ticketId', JSON.stringify({ticketId: ticketId}))
  }

  public setClickedTickedId(ticketId: number){
    sessionStorage.setItem('clickedTicketId', JSON.stringify({ticketId: ticketId}))
  }
}
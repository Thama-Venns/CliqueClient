import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Connection } from '../Model/Connection';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  uri = environment.baseUrl + '/connections/';
  constructor(private http: HttpClient) { }

  getUserConnections(id: number) {
    return this.http.get<Connection[]>(this.uri + id);
  }

  getPendingConnectionRequests(id: number) {
    return this.http.get(this.uri + 'requests/' + id);
  }

  addConnection(requester: number, reciever: number) {
    console.log(reciever);
    return this.http.post(this.uri + requester + '/' + reciever, null);
  }

  acceptConnection(cid: number) {
    return this.http.patch(this.uri + 'request?cid=' + cid, null);
  }
}

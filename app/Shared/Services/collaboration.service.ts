import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  uri = environment.baseUrl + '/collaborations';

  constructor(private http: HttpClient) { }

  getAllConnections() {
    return this.http.get(this.uri);
  }

  acceptCollaboration(profileId: number, collaborationId: number) {
    return this.http.patch(this.uri + '?profileId=' + profileId + '&collaborationId=' + collaborationId, null);
  }
}

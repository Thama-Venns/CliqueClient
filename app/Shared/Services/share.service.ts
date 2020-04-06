import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  uri = environment.baseUrl + '/shares/';

  constructor(private http: HttpClient) { }

  share(profileId: number, postId: number, groupId: number) {
    return this.http.post(this.uri + profileId + '/' + postId + '/' + groupId, null);
  }

  getPendingShares() {
    return this.http.get(this.uri);
  }

  acceptShare(profileId: number, shareId: number) {
    return this.http.patch(this.uri + profileId + '/' + shareId, null);
  }
}

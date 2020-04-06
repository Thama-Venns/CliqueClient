import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../Model/Group';
import { GroupMember } from '../Model/GroupMember';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  uri = environment.baseUrl + '/groups/';

  constructor(private http: HttpClient) { }

  getPublicGroups() {
    return this.http.get(this.uri);
  }

  getGroupById(groupId: number): Observable<Group> {
    return this.http.get<Group>(this.uri + groupId);
  }

  getProfileGroups(profileId: number) {
    return this.http.get(this.uri + 'profile/' + profileId);
  }

  addGroup(group: Group) {
    return this.http.post(this.uri, group);
  }

  addMember(profileId: number, groupId: number) {
    return this.http.post(this.uri + 'members/' + profileId + '/' + groupId, null);
  }

  deleteGroup(groupId: number) {
    console.log('service ' + groupId);
    return this.http.delete(this.uri + groupId);
  }

  findGroupByName(groupName: string) {
    return this.http.get(this.uri + 'byName?groupName=' + groupName);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../Model/Permission';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  uri = environment.baseUrl + '/preferences/';

  constructor(private http: HttpClient) { }

  public getUserPermissions(uid: number) {
    return this.http.get<Permission>(this.uri + uid);
  }

  public getGroupPermissions(groupId: number) {
    return this.http.get(this.uri + '/groups?groupId=' + groupId);
  }
  // public setPreference(permission: Permission) {
  //   return this.http.post<Permission>(this.uri, permission);
  // }

  public updatePreference(permission: Permission) {
    console.log(permission);
    return this.http.patch(this.uri, permission);
  }
}

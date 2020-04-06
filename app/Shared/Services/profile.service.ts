import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../Model/Profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  uri = environment.baseUrl + '/profiles';

  constructor(private http: HttpClient) { }

  getAllProfiles() {
    return this.http.get<Profile[]>(this.uri);
  }

  getProfileById(id: number) {
    return this.http.get<Profile>(this.uri + '/' + id);
  }

  getProfileByUsername(username: string) {
    return this.http.get(this.uri + '/user' + '?username=' + username);
  }

}

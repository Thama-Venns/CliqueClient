import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Profile } from '../Model/Profile';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = environment.baseUrl + '/profiles/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Profile> {
    return this.http.post<Profile>(this.uri + 'login' + '?email=' + email + '&password=' + password, null);
  }

  register(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.uri + 'register', profile);
  }
}

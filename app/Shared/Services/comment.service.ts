import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Comment } from '../Model/Comment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  uri = environment.baseUrl + '/comment';
  constructor(private http: HttpClient) { }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.uri, comment);
  }

}

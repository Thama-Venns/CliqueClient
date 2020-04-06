import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from '../Model/Post';
import { Share } from '../Model/Share';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  uri = environment.baseUrl + '/posts/';
  shareUri = environment.baseUrl + '/shares/';
  collaborationUri = environment.baseUrl + '/collaborations/';

  constructor(private http: HttpClient) { }

  // GETS
  getAllPosts() {
    return this.http.get(this.uri);
  }

  getProfilePostsById(uid: number) {
    return this.http.get(this.uri + 'profile/' + uid);
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(this.uri + '/' + postId);
  }

  getGroupsMemberPosts(profileId: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.uri + 'group/profile/' + profileId)
    .pipe(
      catchError(this.handleError<Post[]>('GetMemberPosts', []))
    );
  }

  getGroupsPosts(groupId: number) {
    return this.http.get(this.uri + 'groups/' + groupId);
  }

  getPostsByUsername(username: string) {
    return this.http.get(this.uri + 'user?username=' + username);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.uri, post);
  }

  like(postId: number) {
    return this.http.patch(this.uri + '/like/' + postId, {});
  }

  createCollaboration(postId: number, profileId: number) {
    return this.http.post(this.collaborationUri, null);
  }

  removePost(postId: number) {
    return this.http.delete(this.uri + '/delete/' + postId);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

import { Component, OnInit } from '@angular/core';
import { Post } from '../Shared/Model/Post';
import { PostService } from '../Shared/Services/post.service';
import { ProfileService } from '../Shared/Services/profile.service';
import { Profile } from '../Shared/Model/Profile';
import { ConnectionService } from '../Shared/Services/connection.service';
import { Connection } from '../Shared/Model/Connection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = Number(sessionStorage.getItem('userId'));
  profile: Profile = new  Profile();
  posts: Post[];
  connections: Connection[];

  show = 'info';

  constructor(
    private router: Router,
    private postService: PostService,
    private profileService: ProfileService,
    private connectionService: ConnectionService
    ) { }

  ngOnInit() {
    if (this.router.url.includes('/profile/')) {
      const username = this.router.url.replace('/profile/', '');
      this.getUserByUsername(username);
    } else {
      this.getProfileById(this.user);
    }

    this.getUserPosts(this.user);
    this.getUserConnections(this.user);
  }

  getProfileById(userId: number) {
    this.profileService.getProfileById(userId)
    .subscribe((profile: Profile) => this.profile = profile);
  }

  getUserPosts(userId: number) {
    this.postService.getProfilePostsById(userId)
    .subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(posts);
    });
  }

  getUserConnections(id: number) {
    this.connectionService.getUserConnections(id)
    .subscribe((response: Connection[]) => {
      this.connections = response;
    });
  }

  getUserByUsername(username: string) {

    this.profileService.getProfileByUsername(username)
    .subscribe((profile: Profile) => this.profile = profile);

    this.profileService.getProfileByUsername(username)
    .subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(posts);
    });
    console.log(this.posts);
    console.log(this.profile);
  }

  ShowContent(element: string) {
    this.show = element;
    return this.show;
  }

}

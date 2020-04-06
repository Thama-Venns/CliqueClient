import { Component, OnInit, Inject, Output, Input } from '@angular/core';
import { PostService } from '../Shared/Services/post.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { GroupService } from '../Shared/Services/group.service';
import { Post } from '../Shared/Model/Post';
import { ConnectionService } from '../Shared/Services/connection.service';
import { Comment } from '../Shared/Model/Comment';
import { CommentService } from '../Shared/Services/comment.service';
import { Group } from '../Shared/Model/Group';
import { ProfileService } from '../Shared/Services/profile.service';
import { Profile } from '../Shared/Model/Profile';
import { Connection } from '../Shared/Model/Connection';
import { Router } from '@angular/router';
import { Collaboration } from '../Shared/Model/Collaboration';
import { PreferenceService } from '../Shared/Services/preference.service';
import { Permission } from '../Shared/Model/Permission';
import { ShareService } from '../Shared/Services/share.service';
import { CollaborationService } from '../Shared/Services/collaboration.service';

export interface DialogData {
  collaborations: Collaboration[];
  groups: Group[];
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  user: number = Number(sessionStorage.getItem('userId'));
  notification: any;

  postModel: Post = new Post();
  commentModel: Comment = new Comment();
  posts: Post[];
  groups: Group[];
  group: Group = new Group();
  @Input() profile: Profile = new Profile();
  permissions: Permission[] = new Array<Permission>();
  groupId: number;

  constructor(
    private router: Router,
    public dialog: MatDialog ,
    private snackBar: MatSnackBar,
    private postsService: PostService,
    private groupService: GroupService,
    private commentService: CommentService,
    private profileService: ProfileService,
    private preferenceService: PreferenceService,
    private shareService: ShareService,
    private collaborationService: CollaborationService
  ) { }

  ngOnInit() {
    if (this.user === 0) {
      this.router.navigate(['/welcome']);
    }

    this.getProfile(this.user);
    this.getMyGroups(this.user);
    // this.getMyGroupPosts(this.user);
    this.getUserGroupPosts(this.user);
  }

  getProfile(userId: number) {
    this.profileService.getProfileById(userId)
    .subscribe((profile: Profile) => this.profile = profile);
  }

  getAllPosts() {
    this.postsService.getAllPosts()
    .subscribe((response: Post[]) => {
      this.posts = response;
    });
  }

  // Might be irrelavant
  getGroupPost(groupId: number) {
    this.postsService.getGroupsPosts(groupId)
    .subscribe((response: Post[]) => {
      this.posts = response;
      console.log(this.posts);
    });
  }

  getUserGroupPosts(profileId: number) {
    this.postsService.getGroupsMemberPosts(profileId)
    .subscribe((response: Post[]) => {
      response.filter(x => {
        x.shares = x.shares.filter(y => y.accepted);
        x.collaborations = x.collaborations.filter(z => z.approved);
      });

      this.posts = response;
      console.log(this.posts);
    });
  }

  getGroupById(groupId: number) {
    this.groupService.getGroupById(groupId)
    .subscribe((response: Group) => this.group = response);
  }

  getMyGroups(profileId: number) {
    this.groupService.getProfileGroups(profileId)
    .subscribe((response: Group[]) => {
      this.groups = response.filter(x => !(x.groupName === 'Friends' && x.profile.id !== this.user));
    });
  }

  getGroupPermissions(groupId: number) {
    this.preferenceService.getGroupPermissions(groupId)
    .subscribe((response: Permission[]) => {
      this.permissions = response;
      console.log(this.permissions);
    });
  }

  deletePost(postId: number) {
    this.postsService.removePost(postId)
    .subscribe((response) => {
      this.notification = response.valueOf;
      this.getUserGroupPosts(this.user);
      this.openSnackBar();
    },
    (error) => {
      this.notification = error.error.text;
      this.getUserGroupPosts(this.user);
      this.openSnackBar();
    });
  }

  post() {
    this.postModel.profile.id = this.user;
    console.log(this.postModel);
    this.postsService.createPost(this.postModel)
    .subscribe((response: Post) => {
      console.log(response);
      this.getUserGroupPosts(this.user);
      console.log(this.posts);
    },
    (error) => {
      this.notification = error.error;
      console.log(this.notification);
      this.openSnackBar();
    }
    );
  }

  likePost(postId: number) {
    this.postsService.like(postId)
    .subscribe((likes: number) => this.posts.forEach(x => {
      if (x.id === postId) {
        x.likes = likes;
      }
      console.log(likes);
    }));
  }

  // Add comments
  addComment(postId: number) {
    this.commentModel.post.id = postId;
    this.commentModel.profile.id = this.user;
    console.log(this.commentModel);
    this.commentService.addComment(this.commentModel)
    .subscribe(response => {
      console.log(response);
      this.getUserGroupPosts(this.user);
    });
  }

  // Share a post
  public sharePost(profileId: number, postId: number, groupId: number) {
    this.shareService.share(profileId, postId, groupId)
    .subscribe(
      (response) => {
        this.notification = response.valueOf;
        console.log(response);
        this.openSnackBar();
      },
      (error) => {
        this.notification = error.error;
        console.error(error.error);
        this.openSnackBar();
      }
    );
  }

  // Add collaboration
  addCollaboration(postId: number, profileId: number) {
    this.postsService.createCollaboration(postId, profileId)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.error(error);
    });
  }

  openDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(TaggingDialogComponent, {
      width: '40%',
      data: {collaborations: this.postModel.collaborations}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.postModel.collaborations = result;
      console.log(this.postModel.collaborations);
    });
  }

  openShareDialog(profileId: number, postId: number): void {
    // tslint:disable-next-line: no-use-before-declare
    const shareDialogRef = this.dialog.open(ShareDialogComponent, {
      width: '45%',
      data: {
        profile: profileId,
        post: postId,
        groups: this.groups
      }
    });

    shareDialogRef.afterClosed().subscribe(result => {
      // this.sharePost(profileId, postId, result);
    });
  }

  openSnackBar() {
    // tslint:disable-next-line: no-use-before-declare
    this.snackBar.open(this.notification, 'Cancel', {
      duration: 1500
    });
  }

}

// share dialog
@Component({
  selector: 'app-share-dialog',
  templateUrl: 'share-dialog.component.html',
  styleUrls: ['./posts.component.scss']
})
export class ShareDialogComponent implements OnInit {
  notification: any;
  groups: Group[];

  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private shareService: ShareService
  ) {}

  ngOnInit() {

  }

  setGroup(groupId: number) {
    console.log(this.data);
    this.data.groupId = groupId;
    console.log(groupId);
    this.onNoClick();
    return this.data.groupId;
  }

  // Share a post
  public sharePost(groupId: number) {
    this.shareService.share(this.data.profile, this.data.post, groupId)
    .subscribe(
      (response) => {
        this.notification = response.valueOf;
        console.log(response);
        this.openSnackBar();
      },
      (error) => {
        this.notification = error.error;
        console.error(error.error);
        this.openSnackBar();
      }
    );
  }

  openSnackBar() {
    // tslint:disable-next-line: no-use-before-declare
    this.snackBar.open(this.notification, 'Cancel', {
      duration: 1500
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Tagging dialog
@Component({
  selector: 'app-tagging-dialog',
  templateUrl: './tagging-dialog.component.html',
  styleUrls: ['./posts.component.scss']
})
export class TaggingDialogComponent implements OnInit {

  user: number = Number(sessionStorage.getItem('userId'));
  connections: Connection[];
  tag: Profile[] = new Array<Profile>();

  constructor(public dialogRef: MatDialogRef<TaggingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private connectionsService: ConnectionService,
  ) {}

  ngOnInit() {
    this.getUserConnections(this.user);
  }

  onChange(event) {
    console.log(event);
    if (event.checked === true) {
      this.tag.push(event.source.value);
      console.log(this.tag);
    }
  }

  getUserConnections(id: number) {
    this.connectionsService.getUserConnections(this.user)
    .subscribe((response: Connection[]) => {
      this.connections = response.filter(x => x.accepted);
      console.log(this.connections);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTags() {
    const a: any = [];

    this.tag.forEach(element => {
      const collab = new Collaboration();
      collab.profile = element;
      a.push(collab);
    });
    this.data.collaborations = a;
    return this.data.collaborations;
    // console.log(this.data.collaborations);
  }


}

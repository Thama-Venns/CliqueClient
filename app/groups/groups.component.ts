import { Component, OnInit, Inject, SimpleChanges, Input, OnChanges } from '@angular/core';
import { GroupService } from '../Shared/Services/group.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Group } from '../Shared/Model/Group';
import { PostService } from '../Shared/Services/post.service';
import { Post } from '../Shared/Model/Post';
import { Connection } from '../Shared/Model/Connection';
import { ConnectionService } from '../Shared/Services/connection.service';
import { Profile } from '../Shared/Model/Profile';
import { Router } from '@angular/router';
import { ProfileService } from '../Shared/Services/profile.service';

export interface DialogData {
  group: Group;
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnChanges {
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private groupService: GroupService,
    private dialog: MatDialog,
    private postsService: PostService
  ) { }

  user = Number(sessionStorage.getItem('userId'));
  groups: Group[];
  @Input() group: Group = new Group();
  posts: Post[];
  profile: Profile = new Profile();

  show = 'posts';

  ngOnInit() {
    this.getProfile();
    this.getMyGroups();
    this.getGroupPosts(this.group.id);

    const groupName = this.router.url.replace('/groups/', '');

    if (this.router.url === '/groups/' + groupName) {
      this.getGroupByName(groupName);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes' + changes);
  }

  getProfile() {
    this.profileService.getProfileById(this.user)
    .subscribe((profile: Profile) => this.profile = profile);
  }

  getGroupPosts(groupId: number) {
    this.postsService.getGroupsPosts(groupId)
    .subscribe((response: Post[]) => {
      this.posts = response; // .filter(x => x.profile.id === this.user);
    });
  }

  getMyGroups() {
    this.groupService.getProfileGroups(this.user)
    .subscribe((response: Group[]) => {
      this.groups = response.filter(x => !(x.groupName === 'Friends' && x.profile.id !== this.user));
      if (this.group.id === undefined) {
        this.group = this.groups[0];
        this.getGroupById(this.group.id);
      }

    });
  }

  getGroupById(groupId: number) {
    this.groupService.getGroupById(groupId)
    .subscribe((response: Group) => {
      this.group = response;
      this.getGroupPosts(this.group.id);
    });
    this.profileExists();
  }

  getGroupByName(groupName: string) {
    this.groupService.findGroupByName(groupName)
    .subscribe((response: Group) => {
      this.group = response;
      this.getGroupPosts(this.group.id);
    });
  }

  profileExists(): boolean {
    // tslint:disable-next-line: no-shadowed-variable
    if (this.group.members.filter(x => x.id === this.user).length !== 0) {
      console.log('member');
      return true;
    }
    console.log('not member');
    return false;
  }


  openCreateGroupDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(AddGroupDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getMyGroups();
    });
  }

  openRemoveGroupDialog(deleteGroup: Group): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(RemoveGroupDialogComponent, {
      data: {group: deleteGroup}
    });
    // tslint:disable-next-line: no-unused-expression
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddMembersDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(AddGroupMembersDialogComponent, {
      width: '500px',
      data: this.group
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ShowContent(element: string) {
    this.show = element;
    return this.show;
  }

}

@Component({
  selector: 'app-addgroup-dialog',
  templateUrl: 'add-group-dialog.html',
  styleUrls: ['./groups.component.scss']
})
export class AddGroupDialogComponent implements OnInit {
  user = Number(sessionStorage.getItem('userId'));
  groupModel: Group = new Group();
  notification: any;
  addedGroup: Group;

  constructor(
    public dialogRef: MatDialogRef<AddGroupDialogComponent>,
    private groupService: GroupService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.groupModel.profile.id = this.user;
  }

  createGroup() {
    this.groupModel.profile.id = this.user;
    this.groupService.addGroup(this.groupModel)
    .subscribe((response) => {
      this.notification = response.valueOf;
      console.log(this.notification);
      this.openSnackBar();
    },
    (error) => {
      this.notification = error.text;
      console.log(this.notification);
      this.openSnackBar();
    });
    this.onNoClick();
  }

  openSnackBar() {
    // tslint:disable-next-line: no-use-before-declare
    this.snackBar.open(this.notification, 'Undo', {
      duration: 1500
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-removegroup-dialog',
  templateUrl: 'remove-group-dialog.html',
  styleUrls: ['./groups.component.scss']
})
export class RemoveGroupDialogComponent {
  dialog: any;
  constructor(public dialogRef: MatDialogRef<RemoveGroupDialogComponent>,
              private groupService: GroupService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  removeGroup(groupId: number) {
    console.log('remove' + groupId);
    this.groupService.deleteGroup(groupId)
    .subscribe((response) => {
      console.log(response);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-addgroupmembers-dialog',
  templateUrl: 'add-group_members_dialog.html',
  styleUrls: ['./groups.component.scss']
})
export class AddGroupMembersDialogComponent implements OnInit {
  user = Number(sessionStorage.getItem('userId'));
  dialog: any;
  connections: Connection[];

  constructor(public dialogRef: MatDialogRef<AddGroupMembersDialogComponent>,
              private groupService: GroupService,
              private connectionService: ConnectionService,
              // private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Group
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.getConnections(this.user);
  }

  // onChange(event) {
  //   const member = new GroupMember();
  //   member.profile.id = event.source.value.id;
  //   if (event.checked) {
  //     this.members.push(member);
  //   }
  // }

  AddGroupMember(profileId: number) {
    console.log(profileId);
    this.groupService.addMember(profileId, this.data.id)
    .subscribe((response) => {
      console.log(response);
    });

    this.onNoClick();
  }

  getConnections(userId: number) {
    this.connectionService.getUserConnections(userId)
    .subscribe((conn: Connection[]) => {
      this.connections = conn;
      console.log(this.connections);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


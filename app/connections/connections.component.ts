import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../Shared/Services/connection.service';
import { Connection } from '../Shared/Model/Connection';
import { ProfileService } from '../Shared/Services/profile.service';
import { Profile } from '../Shared/Model/Profile';
import { Group } from '../Shared/Model/Group';
import { GroupService } from '../Shared/Services/group.service';
import { PostService } from '../Shared/Services/post.service';
import { Share } from '../Shared/Model/Share';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  user: number = Number(sessionStorage.getItem('userId'));
  connections: Connection[];
  profile: Profile;
  profiles: Profile[];
  groups: Group[];
  show = 'people';

  constructor(
    private profileService: ProfileService,
    private connectionService: ConnectionService,
    private groupService: GroupService
    // private postService: PostService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.getUsers();
    this.getUserConnections(this.user);
    this.getPublicGroups();
  }

  getProfile() {
    this.profileService.getProfileById(this.user)
    .subscribe((response: Profile) => this.profile = response );
  }

  getUserConnections(id: number) {
    this.connectionService.getUserConnections(id)
    .subscribe((response: Connection[]) => {
      this.connections = response;
      console.log(this.connections);
    });
  }

  createConnection(requesterId: number, receiverId: number) {
    console.log(requesterId);
    this.connectionService.addConnection(requesterId, receiverId)
    .subscribe(response => {
      console.log(response);
      this.getUsers();
      this.getUserConnections(this.user);
      this.getPublicGroups();
    });
    // reload
    this.getUsers();
  }

  // Might not need it here
  acceptConnection(connectionId: number) {
    this.connectionService.acceptConnection(connectionId)
    .subscribe(response => {
      console.log(response);
      this.getUsers();
      this.getUserConnections(this.user);
      this.getPublicGroups();
    });
    // reload
  }

  getUsers() {
    this.profileService.getAllProfiles()
    .subscribe((profiles: Profile[]) => {
      this.profiles = profiles;
      console.log(this.profiles);
    });
  }

  getPublicGroups() {
    this.groupService.getPublicGroups()
    .subscribe((groups: Group[]) => {
      this.groups = groups;
      console.log('pg: ' + this.groups);
    });
  }

  isConnection(id: number) {
    const connection = this.connections.find(x => x.requester.id === id || x.receiver.id === id);
    return connection;
  }

  ShowContent(show: string) {
    this.show = show;
  }

}

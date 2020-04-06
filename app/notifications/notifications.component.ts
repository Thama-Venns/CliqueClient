import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../Shared/Services/connection.service';
import { Connection } from '../Shared/Model/Connection';
import { PostService } from '../Shared/Services/post.service';
import { Share } from '../Shared/Model/Share';
import { ShareService } from '../Shared/Services/share.service';
import { Profile } from '../Shared/Model/Profile';
import { ProfileService } from '../Shared/Services/profile.service';
import { share } from 'rxjs/operators';
import { Collaboration } from '../Shared/Model/Collaboration';
import { CollaborationService } from '../Shared/Services/collaboration.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  user: number = Number(sessionStorage.getItem('userId'));

  // approved
  cons: Connection[];
  cols: Collaboration[];
  shs: Share[];

  connections: Connection[];
  collaborations: Collaboration[];
  shares: Share[];
  show = 'connections';
  profile: Profile;

  constructor(
    private connectionService: ConnectionService,
    private postService: PostService,
    private shareService: ShareService,
    private profileService: ProfileService,
    private collaboratioService: CollaborationService
    ) { }

  ngOnInit() {
    console.log(this.show);
    this.getProfile();
    this.getPendingConnectionRequests(this.user);
    this.getPendingShares();
    this.getCollaborations();
  }

  getProfile() {
    this.profileService.getProfileById(this.user)
    .subscribe((response: Profile) => {
      this.profile = response;
    });
  }

  getPendingConnectionRequests(id: number) {
    this.connectionService.getPendingConnectionRequests(id)
    .subscribe((response: Connection[]) => {
      this.cons = response.filter(y => y.accepted === true);
      this.connections = response;
    });
  }

  getCollaborations() {
    this.collaboratioService.getAllConnections()
    .subscribe((response: Collaboration[]) => {
      // *ngIf="collaboration.profile.id === user && connection.accepted === false"
      this.cols = response.filter(y => y.approved === true);
      this.collaborations = response.filter(x =>
                            x.post.group.members.some(y => y.id === this.user)); // &&
                            // x.consent.some(z => z.id !== this.user));
                            // .filter(x => // !x.approved &&
                            // x.post.group.members.some(y => y.id === this.user) &&
                            // x.consent.some(z => z.id !== this.user));
      // console.log(this.collaborations);
    },
    (error) => {
      console.log(error.error);
    }
    );
  }

  consent(collab: Collaboration): boolean {
    const coll =  collab.consent.filter(x => x.id === this.user);
    console.log(collab);
    if (coll.length > 0) {
      console.log('Yes');
      return true;
    }
    console.log('No');
    return false;
  }

  acceptCollaboration(profileId: number, collaborationId: number) {
    this.collaboratioService.acceptCollaboration(profileId, collaborationId)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.error(error);
    });
  }

  acceptConnection(connectionId: number) {
    this.connectionService.acceptConnection(connectionId)
    .subscribe(response => {
      console.log(response);
    });
  }

  getPendingShares() {
    this.shareService.getPendingShares()
    .subscribe((response: Share[]) => {
      // console.log(response);
      this.shs = response.filter(y => y.accepted === true);
      this.shares = response.filter(x => !x.accepted &&
                    x.post.group.members.some(y => y.id === this.user) &&
                    !x.consent.some(y => y.id === this.user));
      // console.log(this.hasConsented());
      console.log(this.shares);
    });
  }

  hasConsented(): boolean {
    const shares = this.shares.filter(x => x.consent.filter(y => y.id !== this.user).length !== 0);
    // console.log(shares);
    if (share.length === 0) {
      return false;
    }
    return false;
  }

  acceptShare(shareId: number) {
    this.shareService.acceptShare(this.user, shareId)
    .subscribe((response) => {
      console.log(response);
      this.getPendingShares();
    },
    (error) => {
      console.log(error.error);
    }
    );
  }

}

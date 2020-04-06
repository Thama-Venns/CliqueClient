import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from './Shared/Services/profile.service';
import { Profile } from './Shared/Model/Profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private profileService: ProfileService
  ) {}

  userId = Number(sessionStorage.getItem('userId'));
  profile: Profile;

  ngOnInit() {
    this.getActiveProfile(this.userId);
  }

  // Get logged in user details.
  getActiveProfile(profileId: number) {
    this.profileService.getProfileById(profileId)
    .subscribe((response: Profile) => {
      this.profile = response;
      // console.log(this.profile);
    });
  }
}

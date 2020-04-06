import { Component, OnInit } from '@angular/core';
import { Group } from '../Shared/Model/Group';
import { GroupService } from '../Shared/Services/group.service';
import { Permission } from '../Shared/Model/Permission';
import { PreferenceService } from '../Shared/Services/preference.service';
import { Profile } from '../Shared/Model/Profile';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  user = Number(sessionStorage.getItem('userId'));

  options: string[] = ['Yes', 'No'];
  show = 'content';

  profile: Profile;
  groups: Group[];
  group: Group;
  permissions: Permission = new Permission();
  myPermissions: Permission = new Permission();

  constructor(
    private groupService: GroupService,
    private permissionService: PreferenceService
  ) { }

  ngOnInit() {
    // this.getMyGroups(this.user);
    this.getUserPreferences();
  }

  getUserPreferences() {
    this.permissionService.getUserPermissions(this.user)
    .subscribe((response: Permission) => {
      this.myPermissions = response;
      this.profile = this.myPermissions.profile;
    });
  }

  getMyGroups(profileId: number) {
    this.groupService.getProfileGroups(profileId)
    .subscribe((response: Group[]) => {
      this.groups = response;

      console.log(this.groups);
    });
  }

  setPreferences(preference: Permission) {
    console.log('Ready');
    console.log(this.myPermissions);
    this.permissionService.updatePreference(this.myPermissions)
    .subscribe(response => {
      this.getUserPreferences();
    });
  }

  ShowContent(show: string) {
    this.show = show;
  }

  onChange(event) {
    console.log(event);
    // .source.value.rights);
    if (event.source.indeterminateChange.name ===  'share') { this.permissions.rights.share = event.source.checked; }
    if (event.source.indeterminateChange.name ===  'tag') { this.permissions.rights.tag = event.source.checked; }
    console.log(this.permissions.rights);
  }

}

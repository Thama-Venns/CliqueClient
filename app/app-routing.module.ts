import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PostsComponent } from './posts/posts.component';
import { ConnectionsComponent } from './connections/connections.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { GroupsComponent } from './groups/groups.component';
import { UpdatesComponent } from './updates/updates.component';

const routes: Routes = [
  {path: 'welcome', component: AuthenticationComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: '', component: PostsComponent},
  {path: 'connections', component: ConnectionsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'groups/:groupName', component: GroupsComponent },
  {path: 'updates', component: UpdatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  DashboardComponent,
  AuthenticationComponent,
  PreferencesComponent,
  PostsComponent,
  ConnectionsComponent,
  ProfileComponent,
  NotificationsComponent
];

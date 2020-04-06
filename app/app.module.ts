import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDividerModule, MatListModule, MatExpansionModule, MatIconModule,
  MatButtonModule, MatDialogModule, MatBadgeModule, MatCardModule,
  MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTabsModule, MatSidenavModule,
  MatToolbarModule, MatTooltipModule, MatOptionModule, MatSelectModule, MatRadioGroup, MatRadioModule, MatSnackBar, MatSnackBarModule
} from '@angular/material';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TaggingDialogComponent, ShareDialogComponent } from './posts/posts.component';
import {
  GroupsComponent, AddGroupDialogComponent, RemoveGroupDialogComponent, AddGroupMembersDialogComponent
} from './groups/groups.component';
import { UpdatesComponent } from './updates/updates.component';
import { NewComponentComponent } from './dashboard/new-component/new-component.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    AuthenticationComponent,
    ProfileComponent,
    NotificationsComponent,
    TaggingDialogComponent,
    GroupsComponent,
    AddGroupDialogComponent,
    RemoveGroupDialogComponent,
    AddGroupMembersDialogComponent,
    UpdatesComponent,
    NewComponentComponent,
    ShareDialogComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  entryComponents: [
    TaggingDialogComponent,
    GroupsComponent,
    AddGroupDialogComponent,
    RemoveGroupDialogComponent,
    AddGroupMembersDialogComponent,
    ShareDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

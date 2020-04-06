import { Component, OnInit } from '@angular/core';
import { Profile } from '../Shared/Model/Profile';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../Shared/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  birthDate: NgbDateStruct;

  // Login parameters
  email: string;
  password: string;

  // Profile Object
  profileModel: Profile = new Profile();

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {}

  public OnSignIn() {
    this.authService.login(this.email, this.password)
    .subscribe((response) => {
      this.profileModel = response;
      console.log(this.profileModel);
    });

    if (this.profileModel.email === this.email && this.profileModel.password === this.password) {
      sessionStorage.setItem('userId', this.profileModel.id.toString());
      sessionStorage.setItem('email', this.profileModel.email);
      console.log('route');
      this.router.navigate(['/']);
      console.log('passed');
      return true;
    } else {
      console.log('failed');
      return false;
    }
  }

  public OnSignUp() {
    // Set date (Convert NgbDateStruc to Date)
    if (this.birthDate != null) {
      this.profileModel.dateOfBirth = new Date(this.birthDate.year, this.birthDate.month - 1, this.birthDate.day);
    }
    console.log(this.profileModel);
    return this.authService.register(this.profileModel)
    .subscribe((response) => {
      this.profileModel = response;
      console.log(response);
    });
  }

  logout() {
    sessionStorage.clear();
  }

  isLoggedIn() {
    if (this.profileModel.email === this.email && this.profileModel.password === this.password) {
      sessionStorage.setItem('userId', this.profileModel.id.toString());
      sessionStorage.setItem('email', this.profileModel.email);
      return true;
    } else {
      return false;
    }
  }

}

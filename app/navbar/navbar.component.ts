import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  user = Number(sessionStorage.getItem('userId'));
  title = 'Clique';
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.user == null) {
      this.router.navigate(['/welcome']);
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['welcome']);
  }

}

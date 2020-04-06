import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) { }

ngOnInit() {
  this.activate();
}

activate() {
  let url = this.router.url.replace('/', '');
  if (url === '' || url === null) {
    url = 'dash';
  } else if (url === 'preferences') {
    url = 'dash';
  }
  console.log(url);

  document.getElementById(url).style.color = '#26A69A';
  document.getElementById(url).style.background = '#fafafa';
  document.getElementById(url).style.borderRight = '5px solid #26A69A';
}
}

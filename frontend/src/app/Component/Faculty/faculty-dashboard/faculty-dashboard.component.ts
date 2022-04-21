import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-dashboard',
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.css']
})
export class FacultyDashboardComponent implements OnInit {

  training: boolean = false;
  profile: boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.showTraining();
  }

  setOff() {
    this.training = false;
    this.profile = false;
  }

  // show overview section
  showTraining() {
    this.setOff();
    this.training = true;
  }

  // show faculty section
  showProfile() {
    this.setOff();
    this.profile = true;
  }

  // sign out
  signout() {

    localStorage.clear();
    this.router.navigate(['/']);

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  overview: boolean = false;
  faculty: boolean = false;
  student: boolean = false;
  trainer: boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.showOverview();
  }

  setOff() {
    this.overview = false;
    this.faculty = false;
    this.student = false;
    this.trainer = false;
  }

  // show overview section
  showOverview() {
    this.setOff();
    this.overview = true;
  }

  // show faculty section
  showFaculty() {
    this.setOff();
    this.faculty = true;
  }

  // show trainer section
  showTrainer() {
    this.setOff();
    this.trainer = true;
  }

  // show overview section
  showStudent() {
    this.setOff();
    this.student = true;
  }

  // sign out
  signout() {
    this.router.navigate(['/admin']);
  }

}

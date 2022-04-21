import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Faculty } from 'src/app/Models/faculty';
import { Student } from 'src/app/Models/student';
import { Training } from 'src/app/Models/training';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  studentArr : Student[] = [];
  facultyArr : Faculty[] = [];
  trainingArr : Training[] = [];
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    this.getAllFaculties();
    this.getAllStudents();
    this.getAllTrainings();
  }

  getAllFaculties() {
    this.adminService.getAllFaculty().subscribe(res => {
      this.facultyArr = res;
    }, err=> {
      console.log(err);
    })
  }

  getAllStudents() {
    this.adminService.getAllStudents().subscribe(res => {
      this.studentArr = res;
    }, err=> {
      console.log(err);
    })
  }

  getAllTrainings() {
    this.adminService.getAllTrainings().subscribe(res => {
      this.trainingArr = res;
    }, err=> {
      console.log(err);
    })
  }

}

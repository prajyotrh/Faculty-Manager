import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/Models/training';
import { AdminService } from 'src/app/Services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trainer-data',
  templateUrl: './trainer-data.component.html',
  styleUrls: ['./trainer-data.component.css']
})
export class TrainerDataComponent implements OnInit {

  facultyIds : any[] = [];
  trainings : Training[] = [];

  trainingDetailsObj : Training = {
    _id: '',
    titleOfTraining: '',
    orgInstName: '',
    unversityName: '',
    city: '',
    state: '',
    country: '',
    pincode: 0,
    academicYear: '',
    startingDate: '',
    endDate: '',
    recognizedBy: '',
    mode: '',
    fees: 0,
    fees_paid: 0,
    sponsorship: '',
    venue: '',
    staff_id: '',
    typeOfTraining: '',
    category: '',
    certificate: ''
  }

  constructor(private adminService : AdminService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.getAllFaculties();
    this.getAllTrainings();
  }

  getAllFaculties() {
    this.adminService.getAllFaculty().subscribe(res => {

      res.forEach(faculty => {
        const data = {
          id : faculty.facultyId,
          name : faculty.name
        }
        this.facultyIds.push(data);
      });
    }, err => {
      console.log(err);
    })
  }

  getAllTrainings() {
    this.adminService.getAllTrainings().subscribe(res => {
      this.trainings = res;
    }, err => {
      console.log(err);
    })

  }

  viewTraining(trainingObj : Training) {
    this.trainingDetailsObj = trainingObj;
  }

}

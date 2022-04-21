import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Faculty } from 'src/app/Models/faculty';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-faculty-data',
  templateUrl: './faculty-data.component.html',
  styleUrls: ['./faculty-data.component.css']
})
export class FacultyDataComponent implements OnInit {

  facultyDetailsForm = new FormGroup({
    name: new FormControl(),
    email : new FormControl(),
    mobile : new FormControl(),
    gender : new FormControl(),
    adhar : new FormControl(),
    birthday : new FormControl(),
    department : new FormControl(),
    joiningYear : new FormControl(),
    password : new FormControl()
  });

  newFacultyId : number = 0;

  facultyObj : Faculty = {
    _id: '',
    facultyId: 0,
    name: '',
    email: '',
    gender: '',
    mobile: '',
    adhar: '',
    birthday: '',
    joining_year: 0,
    department: '',
    password: ''
  };

  genderList : any = ['Male', 'Female', 'Other'];
  departmentList : any = ['Information Technology','Computer Science Engineering','Civil Engineering','Mechanical Engineering','Electrical Engineering','Electronics Engineering'];

  allFaculty : Faculty[] = [];

  constructor(private fb: FormBuilder, private adminService : AdminService) { }

  ngOnInit(): void {
    this.facultyDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      mobile : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender : ['', [Validators.required]],
      adhar : ['', [Validators.required,Validators.maxLength(12), Validators.minLength(12)]],
      birthday : ['', [Validators.required]],
      department : ['', [Validators.required]],
      joiningYear : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
    this.newFacultyId = 0;
    this.allFaculty = [];
    this.getAllFaculties();
  }

  addFaculty() {
    this.generateFacultyId();

    this.facultyObj.facultyId = this.newFacultyId;
    this.facultyObj.name = this.facultyDetailsForm.value.name;
    this.facultyObj.email = this.facultyDetailsForm.value.email;
    this.facultyObj.mobile = this.facultyDetailsForm.value.mobile;
    this.facultyObj.gender = this.facultyDetailsForm.value.gender;
    this.facultyObj.adhar = this.facultyDetailsForm.value.adhar;
    this.facultyObj.birthday = this.facultyDetailsForm.value.birthday;
    this.facultyObj.department = this.facultyDetailsForm.value.department;
    this.facultyObj.joining_year = this.facultyDetailsForm.value.joiningYear;
    this.facultyObj.password = this.facultyDetailsForm.value.password;

    this.adminService.addFaculty(this.facultyObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
        console.log('Error Occured');
    })

    let element: HTMLElement = document.getElementById('closeButton')as HTMLElement;
    element.click();
  }

  generateFacultyId() {
    this.getAllFaculties();
    if(this.allFaculty.length === 0) {
      this.newFacultyId = 1;
      return;
    }

    this.newFacultyId = this.allFaculty[this.allFaculty.length-1].facultyId + 1;
  }

  getAllFaculties() {
    this.adminService.getAllFaculty().subscribe(res => {
      this.allFaculty = res;
    }, err=> {
      console.log(err);
    })
  }

  deleteFaculty(faculty : Faculty) {
    if(window.confirm('Are you sure you want to delete '+ faculty.name+' ?')) {
      this.adminService.deleteFaculty(faculty._id).subscribe(res => {
        this.ngOnInit();
      }, err => {
        console.log('Failed to delete faculty '+ err);
      })
    }
  }

  getFaculty(faculty : Faculty) {

    this.facultyDetailsForm = this.fb.group({
      _id : faculty._id,
      faculty_id : faculty.facultyId,
      name: faculty.name,
      email : faculty.email,
      mobile : faculty.mobile,
      gender : faculty.gender,
      adhar : faculty.adhar,
      birthday : faculty.birthday,
      department : faculty.department,
      joiningYear : faculty.joining_year,
      password : faculty.password
    });
  }

  updateFaculty() {

    this.facultyObj._id = this.facultyDetailsForm.value._id;
    this.facultyObj.facultyId = this.facultyDetailsForm.value.faculty_id;
    this.facultyObj.name = this.facultyDetailsForm.value.name;
    this.facultyObj.email = this.facultyDetailsForm.value.email;
    this.facultyObj.mobile = this.facultyDetailsForm.value.mobile;
    this.facultyObj.gender = this.facultyDetailsForm.value.gender;
    this.facultyObj.adhar = this.facultyDetailsForm.value.adhar;
    this.facultyObj.birthday = this.facultyDetailsForm.value.birthday;
    this.facultyObj.department = this.facultyDetailsForm.value.department;
    this.facultyObj.joining_year = this.facultyDetailsForm.value.joiningYear;
    this.facultyObj.password = this.facultyDetailsForm.value.password;

    this.adminService.updateFaculty(this.facultyObj).subscribe(res => {
      let element: HTMLElement = document.getElementById('closeModal')as HTMLElement;
      element.click();
      this.ngOnInit();
    }, err=> {
      console.log('Error while updating faculty '+ err);
    })
  }

}

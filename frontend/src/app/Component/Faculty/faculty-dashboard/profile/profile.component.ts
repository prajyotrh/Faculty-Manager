import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Faculty } from 'src/app/Models/faculty';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb : FormBuilder, private adminService : AdminService) { }

  genderList : any = ['Male', 'Female', 'Other'];
  departmentList : any = ['Information Technology','Computer Science Engineering','Civil Engineering','Mechanical Engineering','Electrical Engineering','Electronics Engineering'];

  facultyForm =  new FormGroup({
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

  facultyDetails : Faculty = {
    _id:'',
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
  }


  ngOnInit(): void {
    this.facultyForm = this.fb.group({
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

    this.facultyDetails = JSON.parse(localStorage.getItem('user')!);

  }

  getFaculty() {
    this.facultyForm = this.fb.group({
      _id : this.facultyDetails._id,
      faculty_id : this.facultyDetails.facultyId,
      name: this.facultyDetails.name,
      email : this.facultyDetails.email,
      mobile : this.facultyDetails.mobile,
      gender : this.facultyDetails.gender,
      adhar : this.facultyDetails.adhar,
      birthday : this.facultyDetails.birthday,
      department : this.facultyDetails.department,
      joiningYear : this.facultyDetails.joining_year,
      password : this.facultyDetails.password
    });
  }

  updateFaculty() {

    this.facultyDetails._id = this.facultyForm.value._id;
    this.facultyDetails.facultyId = this.facultyForm.value.faculty_id;
    this.facultyDetails.name = this.facultyForm.value.name;
    this.facultyDetails.email = this.facultyForm.value.email;
    this.facultyDetails.mobile = this.facultyForm.value.mobile;
    this.facultyDetails.gender = this.facultyForm.value.gender;
    this.facultyDetails.adhar = this.facultyForm.value.adhar;
    this.facultyDetails.birthday = this.facultyForm.value.birthday;
    this.facultyDetails.department = this.facultyForm.value.department;
    this.facultyDetails.joining_year = this.facultyForm.value.joiningYear;
    this.facultyDetails.password = this.facultyForm.value.password;

    this.adminService.updateFaculty(this.facultyDetails).subscribe(res => {
      localStorage.setItem('user',JSON.stringify(res));
      let element: HTMLElement = document.getElementById('closeModal')as HTMLElement;
      element.click();
      this.ngOnInit();
    }, err=> {
      console.log('Error while updating faculty '+ err);
    })
  }



}

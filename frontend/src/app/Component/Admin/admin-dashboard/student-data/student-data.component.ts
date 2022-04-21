import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/Models/student';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit {
  studentDetailsForm = new FormGroup({
    _id : new FormControl(),
    studentId : new FormControl(),
    studentName: new FormControl(),
    fatherName : new FormControl(),
    studentEmail : new FormControl(),
    gender : new FormControl(),
    studentMobile : new FormControl(),
    adhar : new FormControl(),
    birthday : new FormControl(),
    department : new FormControl(),
    passingYear : new FormControl(),
    parentMobile : new FormControl(),
  });

  newStudentId : number = 0;

  studentObj : Student = {
    _id: '',
    studentId: 0,
    studentName: '',
    fatherName: '',
    studentEmail: '',
    gender: '',
    studentMobile: '',
    adhar: '',
    department: '',
    birthday: '',
    passingYear: 0,
    parentMobile: ''
  };

  genderList : any = ['Male', 'Female', 'Other'];
  departmentList : any = ['Information Technology','Computer Science Engineering','Civil Engineering','Mechanical Engineering','Electrical Engineering','Electronics Engineering'];

  allStudents : Student[] = [];

  constructor(private fb: FormBuilder, private adminService : AdminService) { }

  ngOnInit(): void {
    this.studentDetailsForm = this.fb.group({
      studentName : ['', [Validators.required]],
      fatherName : ['', [Validators.required]],
      studentEmail : ['', [Validators.required, Validators.email]],
      studentMobile : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      parentMobile : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender : ['', [Validators.required]],
      adhar : ['', [Validators.required,Validators.maxLength(12), Validators.minLength(12)]],
      birthday : ['', [Validators.required]],
      department : ['', [Validators.required]],
      passingYear : ['', [Validators.required]]
    });
    this.newStudentId = 0;
    this.allStudents = [];
    this.getAllStudents();
  }

  addStudent() {
    this.generateStudentId();

    this.studentObj.studentId = this.newStudentId;
    this.studentObj.studentName = this.studentDetailsForm.value.studentName;
    this.studentObj.studentEmail = this.studentDetailsForm.value.studentEmail;
    this.studentObj.studentMobile = this.studentDetailsForm.value.studentMobile;
    this.studentObj.gender = this.studentDetailsForm.value.gender;
    this.studentObj.adhar = this.studentDetailsForm.value.adhar;
    this.studentObj.birthday = this.studentDetailsForm.value.birthday;
    this.studentObj.department = this.studentDetailsForm.value.department;
    this.studentObj.passingYear = this.studentDetailsForm.value.passingYear;
    this.studentObj.fatherName = this.studentDetailsForm.value.fatherName;
    this.studentObj.parentMobile = this.studentDetailsForm.value.parentMobile;

    this.adminService.addStudent(this.studentObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
        console.log('Error Occured',err);
    })

    let element: HTMLElement = document.getElementById('closeButton')as HTMLElement;
    element.click();
  }

  generateStudentId() {
    this.getAllStudents();
    if(this.allStudents.length === 0) {
      this.newStudentId = 1;
      return;
    }

    this.newStudentId = this.allStudents[this.allStudents.length-1].studentId + 1;
  }

  getAllStudents() {
    this.adminService.getAllStudents().subscribe(res => {
      this.allStudents = res;
    }, err=> {
      console.log(err);
    })
  }

  deleteStudent(student : Student) {
    if(window.confirm('Are you sure you want to delete '+ student.studentName+' ?')) {
      this.adminService.deleteStudnet(student._id).subscribe(res => {
        this.ngOnInit();
      }, err => {
        console.log('Failed to delete student '+ err);
      })
    }
  }

  getStudent(student : Student) {

    this.studentDetailsForm = this.fb.group({
      _id :student._id,
      studentId :student.studentId,
      studentName:student.studentName,
      fatherName :student.fatherName,
      studentEmail :student.studentEmail,
      gender :student.gender,
      studentMobile :student.studentMobile,
      adhar :student.adhar,
      birthday :student.birthday,
      department :student.department,
      passingYear :student.passingYear,
      parentMobile : student.parentMobile
    });
  }

  updateStudent() {

    this.studentObj._id = this.studentDetailsForm.value._id;
    this.studentObj.studentId = this.studentDetailsForm.value.studentId;
    this.studentObj.studentName = this.studentDetailsForm.value.studentName;
    this.studentObj.studentEmail = this.studentDetailsForm.value.studentEmail;
    this.studentObj.studentMobile = this.studentDetailsForm.value.studentMobile;
    this.studentObj.gender = this.studentDetailsForm.value.gender;
    this.studentObj.adhar = this.studentDetailsForm.value.adhar;
    this.studentObj.birthday = this.studentDetailsForm.value.birthday;
    this.studentObj.department = this.studentDetailsForm.value.department;
    this.studentObj.passingYear = this.studentDetailsForm.value.passingYear;
    this.studentObj.fatherName = this.studentDetailsForm.value.fatherName;
    this.studentObj.parentMobile = this.studentDetailsForm.value.parentMobile;

    this.adminService.updateStudent(this.studentObj).subscribe(res => {
      let element: HTMLElement = document.getElementById('closeModal')as HTMLElement;
      element.click();
      this.ngOnInit();
    }, err=> {
      console.log('Error while updating student '+ err);
    })
  }

}

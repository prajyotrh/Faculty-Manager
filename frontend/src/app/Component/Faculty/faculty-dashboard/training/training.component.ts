import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Training } from 'src/app/Models/training';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  trainings : Training[] = [];

  institutes : any = ['IETE','CSI','UGC','AICTE','ISTE','GUJCOST','IEEE'];
  modes : any = ['Online','Offline'];
  sponsorship : any = ['Fully','Partially'];
  typeOfTraining : any =['Workshop','Training'];
  category : any = ['Technical', 'Non-technical'];
  staff_id : string = '';

  trainingDetailsForm = new FormGroup({
    _id: new FormControl(),
    titleOfTraining: new FormControl(),
    orgInstName: new FormControl(),
    unversityName: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    country: new FormControl(),
    pincode: new FormControl(),
    academicYear: new FormControl(),
    startingDate: new FormControl(),
    endDate: new FormControl(),
    recognizedBy: new FormControl(),
    mode: new FormControl(),
    fees: new FormControl(),
    fees_paid: new FormControl(),
    sponsorship: new FormControl(),
    venue: new FormControl(),
    staff_id: new FormControl(),
    typeOfTraining: new FormControl(),
    category: new FormControl(),
    certificate : new FormControl()
  });

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

    this.getAllTrainings();
    this.trainingDetailsForm = this.fb.group({
      titleOfTraining : ['', [Validators.required]],
      orgInstName : ['', [Validators.required]],
      unversityName : ['', [Validators.required]],
      city : ['', [Validators.required]],
      state : ['', [Validators.required]],
      country : ['', [Validators.required]],
      startingDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      pincode : ['', [Validators.required,Validators.maxLength(6), Validators.minLength(6)]],
      academicYear : ['', [Validators.required]],
      mode: ['', [Validators.required]],
      fees: ['', [Validators.required]],
      recognizedBy: ['', [Validators.required]],
      fees_paid: ['', [Validators.required]],
      sponsorship: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      staff_id: [localStorage.getItem('facultyId'), [Validators.required]],
      typeOfTraining: ['', [Validators.required]],
      category: ['', [Validators.required]],
      certificate: ['', [Validators.required]]
    });

  }

  addTraining() {

    this.trainingDetailsObj.titleOfTraining = this.trainingDetailsForm.value.titleOfTraining;
    this.trainingDetailsObj.orgInstName = this.trainingDetailsForm.value.orgInstName;
    this.trainingDetailsObj.unversityName = this.trainingDetailsForm.value.unversityName;
    this.trainingDetailsObj.city = this.trainingDetailsForm.value.city;
    this.trainingDetailsObj.state = this.trainingDetailsForm.value.state;
    this.trainingDetailsObj.country = this.trainingDetailsForm.value.country;
    this.trainingDetailsObj.pincode = this.trainingDetailsForm.value.pincode;
    this.trainingDetailsObj.academicYear = this.trainingDetailsForm.value.academicYear;
    this.trainingDetailsObj.startingDate = this.trainingDetailsForm.value.startingDate;
    this.trainingDetailsObj.endDate = this.trainingDetailsForm.value.endDate;
    this.trainingDetailsObj.recognizedBy = this.trainingDetailsForm.value.recognizedBy;
    this.trainingDetailsObj.mode = this.trainingDetailsForm.value.mode;
    this.trainingDetailsObj.fees = this.trainingDetailsForm.value.fees;
    this.trainingDetailsObj.fees_paid = this.trainingDetailsForm.value.fees_paid;
    this.trainingDetailsObj.sponsorship = this.trainingDetailsForm.value.sponsorship;
    this.trainingDetailsObj.venue = this.trainingDetailsForm.value.venue;
    this.trainingDetailsObj.staff_id = this.trainingDetailsForm.value.staff_id;
    this.trainingDetailsObj.typeOfTraining = this.trainingDetailsForm.value.typeOfTraining;
    this.trainingDetailsObj.category = this.trainingDetailsForm.value.category;

    this.adminService.createTraining(this.trainingDetailsObj,this.trainingDetailsForm.value.certificate).subscribe(res => {
      this.ngOnInit();
    }, err => {
      console.log(err);
    })


  }

  getAllTrainings() {
    this.staff_id = localStorage.getItem('facultyId')!;
    this.adminService.getAllTrainingsById(this.staff_id).subscribe(res => {
      this.trainings = res;
    }, err => {
      console.log(err);
    })

  }

  uploadFile(event:any) {
    const file = event.target.files[0];
    this.trainingDetailsForm.patchValue({
      certificate: file
    });
    this.trainingDetailsForm.get('')?.updateValueAndValidity()
  }

  viewTraining(trainingObj : Training) {
    this.trainingDetailsForm = this.fb.group({

      _id: trainingObj._id,
    titleOfTraining: trainingObj.titleOfTraining,
    orgInstName: trainingObj.orgInstName,
    unversityName: trainingObj.unversityName,
    city: trainingObj.city,
    state: trainingObj.state,
    country: trainingObj.country,
    pincode: trainingObj.pincode,
    academicYear: trainingObj.academicYear,
    startingDate: trainingObj.startingDate,
    endDate: trainingObj.endDate,
    recognizedBy: trainingObj.recognizedBy,
    mode: trainingObj.mode,
    fees: trainingObj.fees,
    fees_paid: trainingObj.fees_paid,
    sponsorship: trainingObj.sponsorship,
    venue: trainingObj.venue,
    staff_id: trainingObj.staff_id,
    typeOfTraining: trainingObj.typeOfTraining,
    category: trainingObj.category,
    certificate : trainingObj.certificate
    });
  }

  deleteTraining(trainingObj : Training) {
    if(window.confirm('Are you sure you want to delete training ' + trainingObj.titleOfTraining+' ?')) {
      this.adminService.deleteTraining(trainingObj._id).subscribe(res => {
        this.ngOnInit();
      }, err=> {
        console.log(err);
      })
    }
  }


}

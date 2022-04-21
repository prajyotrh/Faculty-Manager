import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Faculty } from 'src/app/Models/faculty';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty-login.component.html',
  styleUrls: ['./faculty-login.component.css']
})
export class FacultyLoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  facultyId: string = '';

  facultyObj: Faculty[] = [];

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    this.authService.facultyLogin(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      res => {
        this.facultyObj = res;
        localStorage.setItem('facultyId', this.facultyObj[0].facultyId + '');
        localStorage.setItem('user',JSON.stringify(this.facultyObj[0]));
        this.router.navigate(['faculty/dashboard']);
      }, _err => {
        alert('Login failed. Please enter valid credentials.')
        this.router.navigate(['faculty/login']);
      }
    );
  }

}

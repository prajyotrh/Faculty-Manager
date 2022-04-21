import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Faculty } from '../Models/faculty';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  facultyAuth : string = "http://localhost:3000/faculty/auth";
  facultyObj: Faculty[] = [];

  constructor(private router : Router,  private http : HttpClient) { }

  adminLogin(username : string, password : string) {
      if(username === 'admin' && password === 'admin123') {
        this.router.navigate(['admin/dashboard']);
      } else {
        alert('Login failed. Please enter valid credentials.')
        this.router.navigate(['admin/login']);
      }
  }

  facultyLogin(username : string, password : string) : Observable<Faculty[]>{
    return this.http.post<Faculty[]>(this.facultyAuth,{username,password});
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faculty } from '../Models/faculty';
import { HttpClient } from '@angular/common/http'
import { Student } from '../Models/student';
import { Training } from '../Models/training';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  facultyUrl : string = "http://localhost:3000/admin/faculty";
  studentUrl : string = "http://localhost:3000/admin/student";
  trainingUrl : string = "http://localhost:3000/admin/training";

  constructor( private http : HttpClient) { }

  getAllFaculty() : Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.facultyUrl);
  }

  getFacultyById(id : string) : Observable<Faculty> {
    return this.http.get<Faculty>(this.facultyUrl+'/'+id);
  }

  addFaculty(facultyObj : Faculty) : Observable<Faculty> {
    return this.http.post<Faculty>(this.facultyUrl,facultyObj);
  }

  deleteFaculty(id : string) : Observable<Faculty> {
    return this.http.delete<Faculty>(this.facultyUrl+'/'+id);
  }

  updateFaculty(facultyObj : Faculty) : Observable<Faculty> {
    return this.http.put<Faculty>(this.facultyUrl+'/'+facultyObj._id,facultyObj);
  }


  getAllStudents() : Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl);
  }

  getStudentById(id : string) : Observable<Student> {
    return this.http.get<Student>(this.studentUrl+'/'+id);
  }

  addStudent(studentObj : Student) : Observable<Student> {
    return this.http.post<Student>(this.studentUrl,studentObj);
  }

  deleteStudnet(id : string) : Observable<Student> {
    return this.http.delete<Student>(this.studentUrl+'/'+id);
  }

  updateStudent(studentObj : Student) : Observable<Student> {
    return this.http.put<Student>(this.studentUrl+'/'+studentObj._id,studentObj);
  }

  createTraining(trainingObj : Training, certificate: File): Observable<any> {
      var formData: any = new FormData();
      formData.append('data', JSON.stringify(trainingObj));
      formData.append('image', certificate);
      return this.http.post<Training>(this.trainingUrl, formData, {
        reportProgress: true,
        observe: 'events',
      });
  }

  getAllTrainings() : Observable<Training[]> {
    return this.http.get<Training[]>(this.trainingUrl);
  }

  getAllTrainingsById(id : string) : Observable<Training[]> {
    return this.http.get<Training[]>(this.trainingUrl+'/'+id);
  }
  deleteTraining(id : string) : Observable<Training> {
    return this.http.delete<Training>(this.trainingUrl+'/'+id);
  }

}

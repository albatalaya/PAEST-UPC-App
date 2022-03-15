import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private httpClient: HttpClient,
    ) { }


  // JSON
  getStudent() {
    return this.httpClient.get<any[]>('../../../assets/data/students/get-student.json')
  }

  setStudentSettings() {
    try {
      return true
    } catch (error) {
      console.log('Error getStudent', error);
    }
  }
}

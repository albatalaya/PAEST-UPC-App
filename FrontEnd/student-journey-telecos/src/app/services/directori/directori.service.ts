import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectoriService {

  constructor(
    private httpClient: HttpClient,
    ) { }


  // JSON
  getMatricula() {
    return this.httpClient.get<any[]>('../../../assets/data/notes/get-matricula.json')
  }

  getStudent() {
    return this.httpClient.get<any[]>('../../../assets/data/students/get-student.json')
  }

  getProfessorat(id){
    return this.httpClient.get<any>('https://9k037tr2vi.execute-api.eu-west-3.amazonaws.com/default/get-professor?idgauss='+ id)
  }

  bookMeeting(url, body, options){
    return this.httpClient.post(url, body, { ...options, responseType: 'text' });
  }


}

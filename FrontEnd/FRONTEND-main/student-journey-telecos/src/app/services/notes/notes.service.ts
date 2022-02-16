import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    constructor(
        private httpClient: HttpClient
    ) { }

    // JSON
    getMatricula() {
        return this.httpClient.get<any[]>('../../../assets/data/notes/get-matricula.json')
    }

    // JSON
    getExpedient() {
        return this.httpClient.get<any[]>('../../../assets/data/notes/get-expedient.json')
    }

     // JSON
     getNotes() {
        return this.httpClient.get<any[]>('../../../assets/data/notes/get-notes.json')
    }

}

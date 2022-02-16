import { Component, OnInit } from '@angular/core';
import { DirectoriService } from 'src/app/services/directori/directori.service';


@Component({
  selector: 'app-assignatures',
  templateUrl: './assignatures.page.html',
  styleUrls: ['./assignatures.page.scss'],
})
export class AssignaturesPage implements OnInit {

  constructor(
    private directoriService: DirectoriService
    ) { }

  matricula;

  

  async ngOnInit() { 
    await this.getData();
  }

  async getData(){
    this.directoriService.getMatricula().subscribe(
      res => {
        this.matricula=res[0];
        
      }
    );
  }
}
 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DirectoriService } from 'src/app/services/directori/directori.service';

@Component({
  selector: 'app-professorat',
  templateUrl: './professorat.page.html',
  styleUrls: ['./professorat.page.scss'],
})
export class ProfessoratPage implements OnInit {
    professorat;
    profileId: string;
    classId: string;
    imatge: string;
    img_url: string;
    botoVisible: boolean;

  constructor(
    private directoriService: DirectoriService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    this.profileId= this.activatedRoute.snapshot.paramMap.get('id_prof');
    this.classId= this.activatedRoute.snapshot.paramMap.get('id_class');

    await this.getData();
  }

  async getData(){
    this.directoriService.getProfessorat(this.profileId).subscribe(
      res => {
        this.professorat=res[0];
        if(res[2]!=-1){
          this.professorat.consultes= res[2];
          this.botoVisible=true;
        } else {
          this.professorat.consultes=["Envia correu per acordar hora de consulta"];
          this.botoVisible=false;
        }
        
        
      }
    );
  }
}

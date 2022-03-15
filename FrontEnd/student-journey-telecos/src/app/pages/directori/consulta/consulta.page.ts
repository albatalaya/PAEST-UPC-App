
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { DirectoriService } from 'src/app/services/directori/directori.service';



    

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  profileId: string;
  classId: string;
  student;
  matricula;

  professorat;
  consultes;

  setmana=["Diumenge","Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
  mes=["de Gener", "de Febrer", "de Març", "d'Abril", "de Maig", "de Juny", "de Juliol", "d'Agost", "de Setembre", "d'Octubre", "de Novembre", "de Desembre"];

  horarisConsultaDates;

  diaSeleccionat=new Date(); 
  horaSeleccionada=new Date();
  
  diesLliures=[];
  horesLliures=[]; 
  

  startTime=new Date();
  endTime=new Date();
  meetingLength= 30; 

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private directoriService: DirectoriService
  ) { 
  }

  async ngOnInit() {
    this.profileId= this.activatedRoute.snapshot.paramMap.get('id_prof');
    this.classId= this.activatedRoute.snapshot.paramMap.get('id_class');
    
    await this.getData();

  }


  clicked(){

    this.startTime= new Date(this.horaSeleccionada);
    this.endTime= new Date(this.startTime.getTime() + this.meetingLength*60000);

    let dia= this.setmana[this.startTime.getDay()]+", "+this.startTime.getDate()+" "+this.mes[this.startTime.getMonth()];
    let hora= ('0'+this.startTime.getHours()).slice(-2)+":"+('0'+this.startTime.getMinutes()).slice(-2);

    let url= "https://ponm25lnli.execute-api.eu-west-3.amazonaws.com/CORS/eventcreator?idgauss="+this.profileId;
    
    let httpHeaders = new HttpHeaders({ 
     'Content-Type': 'application/json; charset=UTF-8', 
     'Accept': 'application/json'});
    let options = {headers: httpHeaders};  

    let data = {
      studentName: this.student.firstName+" "+this.student.lastName,
      studentEmail: 'blanca.ruiz@estudiantat.upc.edu', //this.student.email,
      teacherName: this.professorat.nom_prof, 
      teacherEmail: 'alba.talaya@estudiantat.upc.edu', //this.professorat.email,   
      teacherSubject: this.getClass(),
      meetingStart: this.startTime,
      meetingEnd: this.endTime
    };

    let body=JSON.stringify(data);
    
    this.directoriService.bookMeeting(url, body, options).subscribe(
      (response: any) => {
        this.responseAlert("S'ha sol·licitat consulta per al "+dia+" a les "+hora+". Comprova el teu correu electrònic.");
        }, 
      (error: any) => {
        console.log("Error")
        this.responseAlert("No s'ha pogut demanar la consulta. Torna-ho a intentar.");
      }
    )

    }

    getHoraris(){
      this.horarisConsultaDates = this.consultes.map(function(data){
          let c= new Date(data);
          c.setHours(c.getHours()+c.getTimezoneOffset()/60);
          return c;
      });
    }

  async responseAlert(response) {
    const alert = await this.alertController.create({
      message: response,
      buttons: [
        {
        text:'OK',
        handler: ()=> window.location.reload()
        }
      ],
      cssClass: 'responseAlert'
    });
    await alert.present();
    
  }

  horesDisponibles(day){
    let dia= new Date(day);
    this.horesLliures=[];
    for(let i=0; i<this.horarisConsultaDates.length; i++){
      if(this.horarisConsultaDates[i].getFullYear()== dia.getFullYear() && 
          this.horarisConsultaDates[i].getMonth()==dia.getMonth() &&
          this.horarisConsultaDates[i].getDate()==dia.getDate()){ 
            this.horesLliures.push(this.horarisConsultaDates[i]);
          }
    }
    this.horaSeleccionada=this.horesLliures[0];
  }

  diesDisponibles(){ 
    this.diesLliures=[];
    let diaEscollit=this.horarisConsultaDates[0];
    this.diesLliures.push(diaEscollit);
    for(let i=0; i<this.horarisConsultaDates.length; i++){
      if(!(this.horarisConsultaDates[i].getFullYear()== diaEscollit.getFullYear() && 
          this.horarisConsultaDates[i].getMonth()==diaEscollit.getMonth() &&
          this.horarisConsultaDates[i].getDate()==diaEscollit.getDate())){
            diaEscollit=this.horarisConsultaDates[i];
            this.diesLliures.push(diaEscollit);
          }
    }
  }

 getClass(){
   for(let i=0; i<this.matricula.subjects.length; i++){
    if(this.matricula.subjects[i].codiUPC==this.classId){
        return this.matricula.subjects[i].shortName;
      }
   }
 }

 async getData(){
  this.directoriService.getMatricula().subscribe(
    res => {
      this.matricula=res[0];
    }
  );

  this.directoriService.getStudent().subscribe(
    res => {
      this.student=res;
    }
  );

  this.directoriService.getProfessorat(this.profileId).subscribe(
    res => {
      this.professorat=res[0];
      this.consultes=res[1];
      this.professorat.consultes= res[2];

      this.getHoraris();

      this.diesDisponibles();
      this.diaSeleccionat=this.diesLliures[0];
      this.horesDisponibles(this.diaSeleccionat);
      this.horaSeleccionada=this.horesLliures[0];

      
    }
  );


  }

}

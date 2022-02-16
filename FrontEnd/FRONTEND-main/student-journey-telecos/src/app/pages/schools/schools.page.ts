import { ApiErrors } from 'src/app/shared/api-errors.enum';
import { Component, OnInit, NgZone } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { SchoolService } from 'src/app/services/schools/school.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.scss'],
})
export class SchoolsPage implements OnInit {
  errorNoResults;
 

  // schoolsCopy = this.schools;
  schools:any = []
  schoolsCopy = []

  constructor(
    private utilsService: UtilsService,
    private schoolService: SchoolService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.schoolService.getSchools().subscribe(res => {

      this.schools = res
      this.schoolsCopy = this.schools;
      
    })
   
  }

  initializeItems() {
    this.schools = this.schoolsCopy;
  }
  getItems(ev: any) {
    this.errorNoResults = undefined;
    // // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      // this.isItemAvailable = true;
      this.schools = this.schools.filter((item) => {
        return (item.shortName.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.caName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      if (this.schools.length === 0) {
        this.zone.run(() => {
          this.errorNoResults = ApiErrors.LIBRARIES_SEARCH_NO_RESULTS;
        });
      }
    }
  }

  async openMarker(item) {
    // await this.utilsService.openMapsSystem('https://www.google.com/maps/search/' + item.name);
    await this.utilsService.openMapsSystem('https://www.google.com/maps/search/' + item.lat + ',' + item.long);
  }
}

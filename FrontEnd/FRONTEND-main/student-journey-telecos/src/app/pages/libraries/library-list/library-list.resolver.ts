import { UtilsService } from './../../../shared/utils/utils.service';
import { ApiErrors } from './../../../shared/api-errors.enum';
import { ModalErrorComponent } from './../../../components/modal-error/modal-error.component';
import { NavController, ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LibrariesService } from '../../../../app/services/libraries/libraries.service';



@Injectable()
export class LibrariesResolver implements Resolve<any> {

  constructor(private librariesService: LibrariesService, private navCtrl: NavController, private modalCtrl: ModalController, private utilsService: UtilsService) { }

  async resolve() {
    // Base Observable (where we get data from)
    const libraries = this.librariesService.getLibraries().toPromise().catch(error => {
      this.navCtrl.navigateRoot('pages/error/', {queryParams: {error, backPage: 'pages/home'}});
    });
    
    const occupancyRate = this.librariesService.getLibrariesOccupancyRate().toPromise().catch(async error => {
      this.utilsService.openModal(error.error);
    });

    const observablePromise = new Promise((resolve, reject) => {
        resolve({libraries, occupancyRate});
      });
    return observablePromise;
  }
}

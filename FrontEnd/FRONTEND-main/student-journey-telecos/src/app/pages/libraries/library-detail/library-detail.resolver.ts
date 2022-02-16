import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LibrariesService } from 'src/app/services/libraries/libraries.service';


@Injectable()
export class LibraryDetailResolver implements Resolve<any> {

  constructor(private librariesService: LibrariesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    // Base Observable (where we get data from)
    const library = this.librariesService.getLibraryById().toPromise();
    const queryParams = route.queryParams;
    const observablePromise = new Promise((resolve, reject) => {
        resolve({library, queryParams});
      });
    return observablePromise;
  }
}

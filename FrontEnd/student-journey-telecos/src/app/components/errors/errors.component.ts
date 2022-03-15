import { Component, OnInit, Input, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiErrors } from 'src/app/shared/api-errors.enum';
import * as HttpStatus from 'http-status-codes';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {

  constructor(public translate: TranslateService, private zone: NgZone) { }
  @Input() public error;

  urlImage;
  textToShow;
  ngOnInit() {

  }
}

import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../shared/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
})
export class CardNewsComponent implements OnInit {

  loading = true;

  @Input() public newsItem: any;
  constructor(public translateService: TranslateService) { }

  ngOnInit() {}

  // truncate(text, numLength: number) {
  //   this.utilsService.truncate(text,  numLength);
  // }

  truncate(text, numLength: number) {
    if (text.length > numLength) {
      return text.substring(0, numLength) + '...';
    } else {
      return text;
    }
  }

}

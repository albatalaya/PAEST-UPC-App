import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() primaryColor: string;
  @Input() secondaryColor: string;
  @Input() heightProgressBar: string;

  percent = '5%';
  @Input() percentaje: string;

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  constructor() {
  }

  async ngOnInit() {
    const num = Number(this.percentaje.replace('%', ''));
    let numPercent = Number(this.percent.replace('%', ''));

    while (numPercent !== num) {
      if (numPercent < num) {
        numPercent ++;
      }

      if (numPercent > num) {
        numPercent --;
      }

      this.percent = numPercent + '%';
      await this.delay(30);
    }
  }

}

import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent implements OnInit {
  constructor(private modalCtrl: ModalController) { }
  @Input() error;
  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

}

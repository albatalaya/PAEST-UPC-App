import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-carrusel-component',
  templateUrl: './home-carrusel-component.component.html',
  styleUrls: ['./home-carrusel-component.component.scss'],
})
export class HomeCarruselComponentComponent implements OnInit {

  @Input() link;
  @Input() imageBackground;
  @Input() icon;
  @Input() text;

  constructor() { }

  ngOnInit() {}

}

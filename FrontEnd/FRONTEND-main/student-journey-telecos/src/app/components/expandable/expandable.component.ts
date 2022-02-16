// https://www.joshmorony.com/creating-an-accordion-list-in-ionic/
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  // animations: [
  //   trigger('popOverState', [
  //     state('show', style({
  //       height: 'auto'
  //     })),
  //     state('hide',   style({
  //       height: '0px'
  //     })),
  //     transition('show => hide', animate('3s 1s ease-out')),
  //     transition('hide => show', animate('3s 1s ease-in'))
  //   ])
  // ]
})
export class ExpandableComponent implements AfterViewInit {

  // @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper;
  @ViewChild('expandWrapper', { read: ElementRef, static: false }) expandWrapper: ElementRef;

  @Input() expanded: boolean;

  @Input() expandHeight = 100;

  constructor(public renderer: Renderer) {
  }

  ngAfterViewInit() {
    // console.log(this.expandWrapper);
    
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', 'auto');
  }
}

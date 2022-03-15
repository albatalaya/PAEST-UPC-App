import { Component, OnInit, ViewChild, ElementRef, Input, Renderer, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-expandable-menu',
  templateUrl: './expandable-menu.component.html',
  styleUrls: ['./expandable-menu.component.scss'],
})
export class ExpandableMenuComponent implements AfterViewInit {

  @ViewChild('expandWrapper', { read: ElementRef, static: false }) expandWrapper: ElementRef;

  @Input() expanded: boolean;

  @Input() expandHeight = 100;

  constructor(public renderer: Renderer) { }

  ngAfterViewInit() {
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', 'auto');
  }

}

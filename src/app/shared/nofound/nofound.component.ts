import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-nofound',
  templateUrl: './nofound.component.html',
  styles: []
})
export class NofoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('body').addClass('gray-bg');
  }

}

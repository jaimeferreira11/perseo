import { Component, OnInit } from '@angular/core';

declare var Cleave: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    /* let cleave = new Cleave('.currency', {
      numeral: true,
     // delimiter: '·',
      numeralThousandsGroupStyle: 'thousand'
  }); */
  }

}


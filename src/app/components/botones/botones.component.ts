import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styles: []
})
export class BotonesComponent implements OnInit {

  @Input('objeto') objeto: any;
  @Output() grabar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  grabarObjeto() {

    if(!this.objeto){

      console.log('El objeto es nulo');

      return;
    }
    console.log('Grabando el objeto ', this.objeto);

    this.grabar.emit( this.objeto );
  }

}

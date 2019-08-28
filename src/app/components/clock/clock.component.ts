import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ClockService, valorReloj} from './clock.service';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styles: []
})
export class ClockComponent implements OnInit {

  datos$: Observable<valorReloj>;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  ampm: string;
  segundos: string;


  constructor(private segundo: ClockService) { }

  ngOnInit() {
    this.datos$ = this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo;
    });
  }

}

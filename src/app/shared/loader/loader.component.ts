import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/services/services.index';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() message = 'Cargando..';

  constructor(public _loadingService: LoadingService) { }

  ngOnInit() {
  }

}

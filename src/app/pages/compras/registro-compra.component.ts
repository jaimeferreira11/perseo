import { Component, OnInit } from '@angular/core';
import { CompraCab } from '../../models/compra-cab.model';
import { ProveedoresService, UsuarioService, ArticulosService, CompraService, LoadingService } from 'src/app/services/services.index';
import { environment } from 'src/environments/environment';
import { CompraDet } from 'src/app/models/compra-det.model';
import { Articulo } from '../../models/articulo.model';
import { NgForm } from '@angular/forms';
import { ArticuloDeposito } from '../../models/articulo-deposito.model';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-registro-compra',
  templateUrl: './registro-compra.component.html',
  styles: []
})
export class RegistroCompraComponent implements OnInit {

  compra = new CompraCab(null, 'CO', 'FA');

  tipo = 'A';
  detalle = new CompraDet();
  articulo: Articulo = new Articulo();
  articulos: Articulo[] = [];
  servicio: string;

  // loadingSubscription: Subscription;


  constructor(public _proveedorService: ProveedoresService,
    private loadingScreenService: LoadingService,
    public _compraService: CompraService,
    public datePipe: DatePipe,
    public _articuloService: ArticulosService,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {


    this.compra.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  
  }

  numberWithCommas() {
    let x =  this.detalle.precio.toString().replace(/[,]/g, '');
    console.log('Inicial', x);

    console.log(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    this.detalle.precio = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
   // return  x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

}

  ngAfterViewInit(): void {
    this.iniciliazarSelect();
    let self = this;
    $('#selectProveedor').on('select2:select', function (e) {
      let data = e.params.data;
      console.log(data);
      self.buscarProveedor(data.id);
      self.iniciliazarSelect();
    });
    $('#selectArticulo').on('select2:select', function (e) {
      let data = e.params.data;
      console.log(data);
      self.buscarArticulo(data.id);
      self.iniciliazarSelect();
    });
  }

  iniciliazarSelect() {
    $('#selectProveedor').select2({
      language: 'es',
      width: '100%' ,
      placeholder: 'Buscar proveedor...',
      minimumInputLength: 2,
      ajax: {
        url: environment.API + environment.ROOT + '/proveedores/buscador/' + this._usuarioService.usuario.empresa.idEmpresa,
        data: function (params) {
            let query = {
             search: params.term,
           };
          return query;
        },
        processResults: function (data) {
          let res = [];
          data.forEach(e => {

              res.push({
                'id': e.idProveedor,
                'text': e.descripcion
              });
          });
          return {
            results: res
          };

        }
      }
    });

    $('#selectArticulo').select2({
      language: 'es',
      width: '100%' ,
      placeholder: 'Buscar articulo...',
      minimumInputLength: 2,
      ajax: {
        url: environment.API + environment.ROOT + '/articulos/buscador/' + this._usuarioService.usuario.empresa.idEmpresa,
        data: function (params) {
            let query = {
             search: params.term,
           };
          return query;
        },
        processResults: function (data) {
          console.log(data);
          
          let res = [];
          data.forEach(e => {
              res.push({
                'id': e.idArticulo,
                'text': e.descripcion
              });
          });
          return {
            results: res
          };

        }
      }
    });

  }


  buscarProveedor(id: number) {
    this.loadingScreenService.startLoading();
    this._proveedorService.getById(id).subscribe(data => {
      this.compra.proveedor = data;
      this.loadingScreenService.stopLoading();
    });

  }
  buscarArticulo(id: number) {

    this._articuloService.getById(id).subscribe(data => this.articulo = data);

  }

  agregar(){

    this.detalle.precio = this.detalle.precio.toString().replace(/[,]/g, '');
    if (this.tipo === 'S') {
      this.detalle.concepto = this.servicio;
      let idiva = Number($('#selectImpuesto').val());
      if ( idiva === 100 ) {
        this.detalle.ivaImporte = 0;
        this.detalle.ivaPorcentaje = 0;
      } else {
        this.detalle.ivaImporte = (this.detalle.precio * this.detalle.cantidad) / Number($('#selectImpuesto').val());
        this.detalle.ivaPorcentaje = Number($('#selectImpuesto').val());
      }

    } else {
      this.detalle.concepto = this.articulo.descripcion;
      this.detalle.articuloDeposito = new ArticuloDeposito(null, true, this.articulo );
      this.detalle.ivaImporte = (this.detalle.precio * this.detalle.cantidad) / this.articulo.tipoImpuesto.dividendo;
      this.detalle.ivaPorcentaje = this.articulo.tipoImpuesto.tasa;
    }

    this.compra.importe += this.detalle.precio * this.detalle.cantidad;
    this.detalle.gravada = (this.detalle.precio * this.detalle.cantidad) - this.detalle.ivaImporte;
    this.compra.detalles.push(this.detalle);
    this.detalle = new CompraDet();
    this.servicio = '';
    this.articulo = new Articulo();
    if (this.tipo === 'S') { this.detalle.cantidad = 1; }
  }


  cambiaTipo() {

    if ( this.tipo === 'S') {
      this.detalle.cantidad = 1;
    } else {

      this.detalle.cantidad = null;
    }

    setTimeout(() => {
      $('#selectArticulo').val(null).trigger('change');
      this.iniciliazarSelect();
      let self = this;
      $('#selectArticulo').on('select2:select', function (e) {
        let data = e.params.data;
        console.log(data);
        self.buscarArticulo(data.id);
        self.iniciliazarSelect();
      });
    }, 100);
  }


  grabar(f: NgForm) {

    console.log('Grabando....', f);

    if ( f.invalid ) {
      return;
    }
    this.loadingScreenService.startLoading();

    this.compra.comprobante = $('#comprobante').val();
    this.compra.proveedor.timbrado = $('#timbrado').val();
    this.compra.proveedor.vencTimbrado = $('#vencTimbrado').val();
    console.log(this.compra);
    

  // this.sucursal.empresa = this._usuarioService.usuario.empresa;
    this._compraService.grabarCompra(this.compra).subscribe((resp: CompraCab) => {
      swal('Compra Registrada!', `Id Compra ${resp.idCompraCab}`, 'success');
      this.loadingScreenService.stopLoading();
      setTimeout(() => {
        this.cancelar();
      }, 100);

    });
  }


  cancelar () {

    setTimeout(() => {
      this.compra = new CompraCab(null, 'CO', 'FA');
      this.compra.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      
      // this.tipo = 'A';
      this.detalle = new CompraDet();
      this.articulo = new Articulo();
      if (this.tipo === 'S') { this.detalle.cantidad = 1; }
      this.articulos = [];
      this.servicio = '';
      $('#selectArticulo').val(null).trigger('change');
      $('#selectProveedor').val(null).trigger('change');
      this.iniciliazarSelect();
    }, 100);

  }

  borrar(item: CompraDet) {

    this.compra.detalles = this.compra.detalles.filter(e => e !== item);
    this.compra.importe -= item.precio * item.cantidad;
  }

  editar(item) {
    this.borrar(item);
    this.detalle = item;
    this.servicio = item.concepto;
  }

}

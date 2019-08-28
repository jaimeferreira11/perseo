import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService, PerfilService, EmpresaService, DepositoService, SucursalService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';
import { Perfil } from 'src/app/models/perfil.model';
import { Sucursal } from 'src/app/models/sucursal.model';
import { Deposito } from 'src/app/models/deposito.model';
import { Perfilusuario } from '../../../models/perfilusuario.model';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  unico = true;
  usuario: Usuario;
  lista: Usuario[] = [];

  empresa: Empresa;
  empresas: Empresa[] = [];
  sucursales: Sucursal[] = [];
  depositos: Deposito[] = [];
  perfiles: Perfil[] = [];
  usuarioPerfiles: number[] = [];

  // tabla Paginacion
  listaFiltrada: Usuario[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;


  clazz = '';

  constructor(public _perfilService: PerfilService,
    public _usuarioService: UsuarioService,
    public _empresaService: EmpresaService,
    public _sucursalService: SucursalService,
    public _depositoService: DepositoService) { }

  ngOnInit() {

    setTimeout(() => {
      $('.select2').select2();
    }, 100);

    this.empresa = this._usuarioService.usuario.empresa;
    this.obtenerDatos(this.empresa.idEmpresa);

    // traer listas
    this._perfilService.getAll().subscribe(data => this.perfiles = data);

    this._empresaService.getAll(false, true).subscribe(data => {
      this.empresas = data;
      console.log('id empresa ' , this._usuarioService.usuario.empresa.idEmpresa);
      setTimeout(() => {
        $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
        this.empresa = this._usuarioService.usuario.empresa;
        this.obtenerDatos(this.empresa.idEmpresa);
      }, 100);

    });

    // change
    let self = this;

    $('#selectEmpresa').on('select2:select', function (e) {
      let data = e.params.data;
      self.empresa = new Empresa(data.id);
      self.obtenerDatos(data.id);

    });


  }

  obtenerDatos(id: number) {

    this._usuarioService.getAllByEmpresa(id, true, true).subscribe(data => {
      this.lista = data;
      this.listaFiltrada = data;
      this.collectionSize = this.lista.length;

    });

    this._sucursalService.getByEmpresa(id, false, true).subscribe(data => this.sucursales = data);

    setTimeout(() => {
      $('.select2').select2();
    }, 100);

  }


  search(text: string) {
    console.log('Buscando ' + text);

    if (!text) {
      return this.listaFiltrada = this.lista;
    }

    this.listaFiltrada =
     this.lista.filter((data: Usuario ) => data.nombreApellido.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Usuario) {

    this.usuario = Object.assign({}, item);

    this.usuario.perfiles.forEach(p => {
      this.usuarioPerfiles.push(p.perfil.idPerfil);
    });


    setTimeout(() => {
      $('.select2').select2();
       $('#selectPerfil').val(this.usuarioPerfiles).trigger('change');
       $('#selectSucursal').val(this.usuario.sucursal.idSucursal).trigger('change');
       if(this.usuario.sucursal) {
         this._depositoService.getBySucursal(this.usuario.sucursal.idSucursal, false, true).subscribe(resp => this.depositos = resp);

       }
      let self = this;
      $('#selectSucursal').on('select2:select', function (e) {
        let data = e.params.data;
        self.usuario.sucursal = new Sucursal(data.id);
        self._depositoService.getBySucursal(data.id, false, true).subscribe(resp => this.depositos = resp);

      });
    }, 100);
  }


  grabar(f: NgForm) {

    console.log(f);
    this.clazz = '';

    if (this.usuario.password !== $('#password2').val()) {
     this.clazz = 'error';
    }

    if ( f.invalid ) {
      return;
    }



   let aux: Array<string>;
    aux = $('#selectPerfil').val();

    aux.forEach(element => {
      this.usuario.perfiles.push(new Perfilusuario(null, this.usuario.idUsuario, new Perfil(Number(element)) ));
    });

    this.usuario.empresa = this.empresa;

    console.log('Grabando el usuario ' , this.usuario);

    this._usuarioService.save(this.usuario).subscribe((resp: Usuario) => {
      swal('Usuario Guardada!', resp.login, 'success');
      this.usuario = null;
      this.obtenerDatos(this.empresa.idEmpresa);
    });

  }


  cancelar () {

    this.usuario = null;

  }

  agregar(){
    this.usuario = new Usuario(null, null, true);


    setTimeout(() => {
      $('.select2').select2();
      // $('#selectPerfil').val(null).trigger('change');
      let self = this;
      $('#selectSucursal').on('select2:select', function (e) {
        let data = e.params.data;
        self.usuario.sucursal = new Sucursal(data.id);
        self._depositoService.getBySucursal(data.id, false, true).subscribe(resp => this.depositos = resp);

      });
 
    }, 100);


  }



  verificarUsername() {

    if (!this.usuario.login) {
      return;
    }


    this._usuarioService.getByLogin(this.usuario.login).subscribe((data: Usuario) => {

      if (data.idUsuario) {
        this.unico = false;
      } else {
        this.unico = true;
      }

    });
  }

}

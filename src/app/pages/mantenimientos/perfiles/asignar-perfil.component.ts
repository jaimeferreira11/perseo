import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService, EmpresaService, UsuarioService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';
import { Usuario } from '../../../models/usuario.model';
import { Perfilusuario } from '../../../models/perfilusuario.model';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-asignar-perfil',
  templateUrl: './asignar-perfil.component.html',
  styles: []
})
export class AsignarPerfilComponent implements OnInit {

  

  empresas: Empresa[] = [];
  empresa: Empresa;
  usuarios: Usuario[] = [];
  usuario = new Usuario();
  perfiles: Perfil[] = [];
  perfil: Perfil;



  constructor(public _perfilService: PerfilService,
     public _empresaService: EmpresaService,
     public _usuarioService: UsuarioService,
     private toastr: ToastrService) { }

  ngOnInit() {

    $('.select2').select2();
   this.obtenerDatos();
  

    let self = this;
    $('#selectEmpresa').on('select2:select', function (e) {
      let data = e.params.data;
      self.empresa = new Empresa(data.id);
      self.obtenerUsuarios(data.id);

    });

    $('#selectUsuario').on('select2:select', function (e) {
      let data = e.params.data;
      console.log(data);
      self._usuarioService.getById(data.id).subscribe(resp => self.usuario = resp);

    });

    $('#selectPerfil').on('select2:select', function (e) {
      let data = e.params.data;
      self.perfil = new Perfil(data.id, null, data.text);

    });
  }


  obtenerUsuarios(id: number) {
    this._usuarioService.getAllByEmpresa(id , false, true).subscribe(data => this.usuarios = data);
    $('#selectUsuario').trigger('change');
  }

  obtenerDatos() {

    this._perfilService.getAll().subscribe(data => this.perfiles = data);
    this._empresaService.getAll(false, true).subscribe(data => {
      this.empresas = data;
      console.log('id empresa ' , this._usuarioService.usuario.empresa.idEmpresa);
      setTimeout(() => {
        $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
        this.empresa = this._usuarioService.usuario.empresa;
        this.obtenerUsuarios(this.empresa.idEmpresa);
      }, 100);

    });

  }




  seleccionar(item: Perfil) {

    this.perfil = Object.assign({}, item);
  }


  grabar() {

    if ( !this.usuario.idUsuario ) {
      return;
    }

    if ( !this.perfil ) {
      return;
    }

    if(this.usuario.perfiles.findIndex(e => e.perfil.idPerfil == this.perfil.idPerfil) > -1) {

       return this.toastr.warning('El usuario ya cuente con ese Perfil');
    }
    console.log(this.usuario.perfiles.findIndex(e => e.perfil.idPerfil == this.perfil.idPerfil));

  this._perfilService.addPerfilUsuario(new Perfilusuario(null, this.usuario.idUsuario, this.perfil)).subscribe(resp => {
      swal('¡Perfil Agregado!', this.perfil.descripcion, 'success');
      this.usuario.perfiles.push(new Perfilusuario(null, this.usuario.idUsuario, this.perfil));
      this.perfil = null;
    });


  }


  cancelar () {

    this.perfil = new Perfil(null, true);

  }

  eliminar(item: Perfil) {


    swal({
      title: '¿Eliminar el Perfil?',
      icon: 'warning',
      text: item.descripcion,
      buttons: {
        cancel: {
          text: 'No, Cancelar',
          visible: true,
          value: false,
         // className: 'btn btn-danger',
        },
        confirm: {
          text: 'Si, Eliminar',
          visible: true,
          closeModal: false
        }
      }
    })
    .then( value => {

      if (value === false) {
        swal.stopLoading();
        return false;
      }

      this._perfilService.deletePerfilUsuario(new Perfilusuario(null, this.usuario.idUsuario, item)).subscribe((resp: Perfil) => {
        swal.stopLoading();
        swal('¡Perfil Eliminado!', '', 'success');
        this.usuario.perfiles = this.usuario.perfiles.filter(p => p.perfil.idPerfil !== item.idPerfil);
      });

    });


  }

}

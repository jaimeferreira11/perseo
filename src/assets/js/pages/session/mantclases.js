var context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
var login;
var table;
var edit = false;
var estado= true
$(document).ready(function(){
	login = JSON.parse(sjcl.decrypt(encrypt, localStorage.usuario));
     table = $('#tabla').DataTable({
    	 "language": { "url": context + "/js/plugins/dataTables/Spanish.json"},
    	pageLength: 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            { extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Usuarios'},
            {extend: 'pdf', title: 'Usuarios'},

            {extend: 'print',
             customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
            }
            }
        ]

    });
    
    $('#tabla tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            deshabilitar($("#btnEdit"))
            deshabilitar($("#btnDelete"))
            habilitar($("#btnAdd"))
            edit = false;
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            habilitar($("#btnEdit"))
            habilitar($("#btnDelete"))
            deshabilitar($("#btnAdd"))
            edit = true;
           // clearForm()
            insertForm(this);
            
        }
    } );
    
   
    
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
    

    
    $('#ms_checkEstado').on('ifUnchecked', function(event){
    	  estado = false;
    	});
    $('#ms_checkEstado').on('ifChecked', function(event){
  	  estado = true;
  	});
    
    getAll();

});

function modal() {	
	$('#modal').modal()
}

function reloadTable(){
	var table = $('#tabla').DataTable();
	table.clear().draw();
	 getAll();
	
}



//obtener usuarios
function getAll(){
	blockScreen();
	$.ajax({
		type : "GET",
		url : context + "/private/clase/all",		
		success : function(data) {
			console.log(data)
			data = JSON.stringify(data);
			var jsonobject = JSON.parse(data);
			if (jsonobject.estado == 'ERROR') {
				alertify.errorAlert(jsonobject.Message);
			} else if (jsonobject.estado == 'OK') {	
				
				var table = $('#tabla').DataTable();

				$.each(jsonobject.datos, function(index, element) {
					
					var estado = "";
					if(element.estado == true){
						estado = '<span class="label label-primary pull-center">Activo</span>'
					}else{
						estado ='<span class="label label-danger pull-center">Inactivo</span>'
					}

					
					table.rows.add( [ {
							"0": element.idclase,
							"1": element.descripcion,
							"2": element.url,
							"3": estado,

				
						}
						] ).draw();
						
					});			
			}
			$(document).ajaxStop($.unblockUI);
		},
		error : function(e) {
			console.log("ERROR: ", e);	
			$(document).ajaxStop($.unblockUI);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
}





function insertForm(fila) {
	document.getElementById('ms_idclase').value = fila.cells[0].innerHTML;
	document.getElementById('ms_descripcion').value = fila.cells[1].innerHTML;
	document.getElementById('ms_url').value = fila.cells[2].innerHTML;

	if(fila.cells[3].innerText == "Activo"){
		$('#ms_checkEstado').iCheck('check'); 
	}else{
		$('#ms_checkEstado').iCheck('uncheck'); 
	}
	deshabilitar($("#btnAdd"))
	habilitar($("#btnEdit"))
}

function clearForm() {
	table.$('tr.selected').removeClass('selected');
	document.getElementById('ms_idclase').value = 0;
	document.getElementById('ms_descripcion').value = "";
	document.getElementById('ms_url').value = "";
	$('#mu_checkEstado').iCheck('check'); 
	deshabilitar($("#btnEdit"))
	habilitar($("#btnAdd"))
}



function guardar(){
	if(validate() == 0){	
		var path = context + "/private/clase"
		var pojo =pojoClase(document.getElementById('ms_idclase').value, document.getElementById('ms_descripcion').value, document.getElementById('ms_url').value, estado,login.empresa.idempresa)
				console.log(pojo)
		if(document.getElementById('ms_idclase').value == 0){
			//insert
			$.ajax({
				type : "POST",
				url : path+"/insert",
				data :{
					"clase" : pojo
				},
				success : function(data) {
					console.log(data)
					data = JSON.stringify(data);
					var jsonobject = JSON.parse(data);
					
					if (jsonobject.estado == "ERROR") {
						$('#modal').modal("toggle")
						alertify.errorAlert(jsonobject.error);
	
					} else if (jsonobject.estado == 'OK') {	
						alertify .alert("Proceso Correcto", "Programa  insertado correctamente", function(){ 							
						});
						
						clearForm();
						$('#modal').modal("toggle")
						reloadTable()
						
					}
				},
				error : function(e) {
					console.log("ERROR: ", e);			
				},
				done : function(e) {
					console.log("DONE");
				}
			});
			
		}else{
			//update
			$.ajax({
				type : "POST",
				url : path+"/update",
				data :{
					"clase" : pojo
				},
				success : function(data) {
					console.log(data)
					data = JSON.stringify(data);
					var jsonobject = JSON.parse(data);
					
					if (jsonobject.estado == "ERROR") {
						$('#modal').modal("toggle")
						alertify.errorAlert(jsonobject.error);
						alertify.error('Error message');
					} else if (jsonobject.estado == 'OK') {	
						alertify .alert("Proceso Correcto", "Programa actualizado correctamente", function(){ 		
						});
						clearForm();
						$('#modal').modal("toggle")
						reloadTable()
						
						
					}
				},
				error : function(e) {
					console.log("ERROR: ", e);			
				},
				done : function(e) {
					console.log("DONE");
				}
			});
			
		}
		
	  
	}
	
}

function cerrar(){
	clearForm()
}


function validate(){
	
	var error = 0;
	if (!validarVacio($("#ms_descripcion").val())) {			
		$("#ms_descripcion").css({'border':'1px solid red'});
		error++;
		
	}else{
		  $("#ms_descripcion").css({'border':'1px solid #d2d6de'});
	 }
	
	if (!validarVacio($("#ms_url").val())) {			
		$("#ms_url").css({'border':'1px solid red'});
		error++;
		
	}else{
		  $("#ms_url").css({'border':'1px solid #d2d6de'});
	 }
	
	console.log("error: " + error)
	return error;
}






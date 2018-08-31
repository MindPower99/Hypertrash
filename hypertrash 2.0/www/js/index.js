var app = {
	ip: 'http://localhost:8000',
    db: null,
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
	    this.loginTable();
        app.atMostrar();
		app.vAgenda();
        document.getElementById('btnCadastrarusuario').addEventListener('click', this.registrarUsuario);
		document.getElementById('btnCadastrarcoop').addEventListener('click', this.registrarCooperativa);
        document.getElementById('btnEntrar').addEventListener('click', this.fazerLogin);
		document.getElementById('btnEntrarcoop').addEventListener('click', this.fazerLogincoop);
		document.getElementById('BtnAgendar').addEventListener('click', this.Agendamento);
    },
	
	goToPageRegister: function(){
        $.mobile.changePage("#pageRegister");
	},

    loginTable: function(){
	    app.db = window.openDatabase('loginMagicTable', 1.0, 'nope', 10000000);
	    app.db.transaction(function(tx) {
            tx.executeSql("DROP TABLE IF EXISTS logado");
            tx.executeSql("CREATE TABLE IF NOT EXISTS logado (id INTEGER, nome VARCHAR(50), telefone VARCHAR(20), email VARCHAR(50), senha VARCHAR(50))");
        });
    },

    fazerLogin: function(){
        var vEmail = document.getElementById('emailuser').value;
        var vSenha = document.getElementById('senhauser').value;
        $.ajax({
            type: "POST",
            url: "http://localhost/index.php",
            data: {
                acao: 'login',
                email: vEmail,
                senha: vSenha
            },
            dataType: "json",
            success: function (json) {
                if(json.result == true){
                    console.log(json.err);
                    app.db.transaction(function (tx) {
						tx.executeSql("Delete from logado where id=id");
                        var sql = "INSERT INTO logado (id, nome, email, telefone, senha) VALUES ('"+json.id+"', '"+json.nome+"', '"+json.email+"', '"+json.telefone+"', '"+json.senha+"')";
                        console.log("##cliente::logado>"+sql);
                        tx.executeSql(sql);
                        $.mobile.changePage("#paginausuario");
						var ssql = "select * from logado where email = '"+ json.email +"'";
						tx.executeSql(ssql, [], function (tx, result) {
							console.log(result);
							document.getElementById('divAppendNome').append(result.rows[0].nome);
							document.getElementById('divAppendEmail').append(result.rows[0].email);
							document.getElementById('divAppendTel').append(result.rows[0].telefone);
						});
                    });
                }
                else if(json.result == false && json.alert == true){
                    alert(json.err);
                }
            },
            error: function(){
                console.log("##cliente::error");
            }
        });		
    },
	registrarUsuario: function(){
		var vNome = document.getElementById('salvarnome').value;
		var vEmail = document.getElementById('salvaremail').value;
		var vTelefone= document.getElementById('salvartelefone').value;
		var vCidade= document.getElementById('cidades').value;
		var vEstado= document.getElementById('estados').value;
		var vBairro= document.getElementById('bairros').value;
		var vRua= document.getElementById('salvarrua').value;
		var vNum= document.getElementById('salvarnum').value;
		var vSenha = document.getElementById('salvarsenha').value;
		var vSSenha = document.getElementById('salvarsenharpt').value;
		
		if(vNome==""){
            alert('O campo nome deve estar preenchido');
        }
        else if(vEmail==""){
            alert('O campo email deve estar preenchido');
        }
        else if(vEmail.search('@')<1){
            alert('O campo email deve conter um email valido');
        }
        else if(vTelefone==""){
		    alert('O campo telefone deve estar preenchido');
        }
        else if(vTelefone.length<9){
		    alert('O campo telefone deve conter um telefone válido');
        }
        else if(vSenha==""){
            alert('O campo senha deve estar preenchido');
        }
        else if(vSSenha==""){
            alert('O campo confirmar senha deve estar preenchido');
        }
        else if(vSenha!=vSSenha){
		    alert('As senhas não se correspondem');
        }
		else{
			$.ajax({
				type: "POST",
				url: "http://localhost/index.php",
				data: {
					acao: 'registrarUsuario',
					nome: vNome,
					email: vEmail,
					telefone: vTelefone,
					estado: vEstado,
					cidade: vCidade,
					bairro: vBairro,
					rua: vRua,
					numero: vNum,
					senha: vSenha
				},
				dataType: "json", 
				success: function (json) {
					if(json.result == true){
						console.log(json.err);
					}
					else{
						console.log(json.err);
					}
					if(json.alert == true){
					    alert(json.err);
                    }
                    else if(json.result == true){
					    alert('Cadastrado com sucesso');
                        document.getElementById('salvarnome').value = "";
                        document.getElementById('salvaremail').value = "";
                        document.getElementById('salvartelefone').value = "";
                        document.getElementById('salvarsenha').value = "";
                        document.getElementById('salvarsenharpt').value = "";
					    $.mobile.changePage('#login');
                    }
				},
				error: function(){
					console.log("##error");
				}
			});
		}
	},
//----------------------------------------------------------------------------------- CADASTRAR BARBEIRO ------------------------------------------------------------------------	
	 fazerLogincoop: function(){
        var vEmail = document.getElementById('emailcoop').value;
        var vSenha = document.getElementById('senhacoop').value;
        $.ajax({
            type: "POST",
            url: "http://localhost/index.php",
            data: {
                acao: 'logincoop',
                email: vEmail,
                senha: vSenha
            },
            dataType: "json",
            success: function (json) {
                if(json.result == true){
                    console.log(json.err);
                    app.db.transaction(function (tx) {
						tx.executeSql("Delete from logado where id=id");
                        var sql = "INSERT INTO logado (id, nome, email, telefone, senha) VALUES ('"+json.id+"', '"+json.nome+"', '"+json.email+"', '"+json.telefone+"', '"+json.senha+"')";
                        console.log("##cliente::Logado>"+sql);
                        tx.executeSql(sql);
                        $.mobile.changePage("#paginacoop");
						var ssql = "select * from logado where email = '"+ json.email +"'";
						tx.executeSql(ssql, [], function (tx, result) {
							console.log(result);
							document.getElementById('divAppendNomecoop').append(result.rows[0].nome);
							document.getElementById('divAppendEmailcoop').append(result.rows[0].email);
							document.getElementById('divAppendTelcoop').append(result.rows[0].telefone);
						});
                    });
                }
                else if(json.result == false && json.alert == true){
                    alert(json.err);
                }
            },
            error: function(){
                console.log("##cliente::error");
            }
        });		
    },  
	
	registrarCooperativa: function(){
			var vNome = document.getElementById('salvarnomecoop').value;
			var vEmail = document.getElementById('salvaremailcoop').value;
			var vTelefone= document.getElementById('salvartelefonecoop').value;
			var vCnpj= document.getElementById('salvarcnpj').value;
			var vCidade= document.getElementById('cidadescoop').value;
			var vEstado= document.getElementById('estadoscoop').value;
			var vBairro= document.getElementById('bairroscoop').value;
			var vRua= document.getElementById('salvarruacoop').value;
			var vNum= document.getElementById('salvarnumcoop').value;
			var vSenha = document.getElementById('salvarsenhacoop').value;
			var vSSenha = document.getElementById('salvarsenharptcoop').value;
			if(vNome==""){
				alert('O campo nome deve estar preenchido');
			}
			else if(vEmail==""){
				alert('O campo email deve estar preenchido');
			}
			else if(vEmail.search('@')<1){
				alert('O campo email deve conter um email valido');
			}
			else if(vTelefone==""){
				alert('O campo telefone deve estar preenchido');
			}
			else if(vTelefone.length<9){
				alert('O campo telefone deve conter um telefone válido');
			}
			else if(vSenha==""){
				alert('O campo senha deve estar preenchido');
			}
			else if(vSSenha==""){
				alert('O campo confirmar senha deve estar preenchido');
			}
			else if(vSenha!=vSSenha){
				alert('As senhas não se correspondem');
			}
			else{
				$.ajax({
					type: "POST",
					url: "http://localhost/index.php",
					data: {
						acao: 'registrarCooperativa',
						nome: vNome,
						email: vEmail,
						telefone: vTelefone,
						cnpj: vCnpj,
						cidade: vCidade,
						estado: vEstado,
						bairro: vBairro,
						rua: vRua,
						numero: vNum,
						senha: vSenha
					},
					dataType: "json", 
					success: function (json) {
						if(json.result == true){
							console.log(json.err);
						}
						else{
							console.log(json.err);
						}
						if(json.alert == true){
							alert(json.err);
						}
						else if(json.result == true){
							alert('Cadastrado feito com sucesso');
							document.getElementById('salvarnomecoop').value = "";
							document.getElementById('salvaremailcoop').value = "";
							document.getElementById('salvartelefonecoop').value = "";
							document.getElementById('salvarenderecocoop').value = "";
							document.getElementById('salvarsenhacoop').value = "";
							document.getElementById('salvarsenharptcoop').value = "";
							$.mobile.changePage('#login');
						}
					},
					error: function(){
						console.log("##error");
					}
				});
			}
		},
//----------------------------------------------------------------------------------- MOSTRAR BARBEIRO ------------------------------------------------------------------------	
	 atMostrar: function(){$.ajax({
            type: "GET",
            url: "http://localhost/index.php",
            data: {
                acao: 'usuarios',
            },
            dataType: "json",
            success: function (json) {
                if(json){
					console.log(json);
						var tr="";
						for(var i = 0; i < json.length; i++){
							tr += '<div data-role="collapsible" data-corners="false" class="ui-corner-none" data-collapsed="false">'
							tr +=	'<h2 class="ui-collapsible-heading"><a class="ui-collapsible-heading-toggle ui-btn ui-btn-icon-left ui-btn-up-d" href="#" data-corners="false" data-shadow="false" data-iconshadow="true" data-icon="plus" data-iconpos="left" data-theme="a">'
							tr +=		'<span class="ui-btn-text">'+ json[i].nome +'</span>'
							tr +=	'</a></h2>'
							tr +=	'<div class="ui-body ui-body-d ui-textalign-left">'
							tr +=		'<!-- profile fields -->'		  
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Email</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>'+ json[i].email
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Telefone</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].telefone
							tr +=		'<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'><div class="left-table">Endereco</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].endereco
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Horario</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].horario 
							tr +=		'</div>'
							tr +=	'</div>'
							tr +=		'<a href="#Agendar" data-position-to="window" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-mail" data-transition="pop">Solicitar Serviço</a>'
							tr +=		'</div>'
							tr +=	'</div>'
							document.getElementById('MOSTRAR').innerHTML = tr;           
						}
                }
                else{
					console.log(json);
                }
            },
            error: function(){
                console.log("##cliente::error");
            }
        })
	 },
//----------------------------------------------------------------------------------- REGISTRAR AGENDAMENTO ------------------------------------------------------------------------		 
	Agendamento: function(){
			var vNome = document.getElementById('AgndNome').value;
			var vEndereco= document.getElementById('AgndEndereco').value;
			var vTelefone= document.getElementById('AgndTelefone').value;
			var vData= document.getElementById('AgndData').value;
			//var vNomeCoop= document.getElementById('AgndEndereco').value;
			//var vEnderecoCoop= document.getElementById('AgndEndereco').value;
			//var vLocal = document.getElementById('AgndLocal').value;
			
			if(vNome==""){
				alert('O campo nome deve estar preenchido');
			}
			else if(vTelefone==""){
				alert('O campo telefone deve estar preenchido');
			}
			else if(vTelefone.length<9){
				alert('O campo telefone deve conter um telefone válido');
			} else{
				$.ajax({
					type: "POST",
					url: "http://localhost/index.php",
					data: {
						acao:'servicos',
						nome: vNome,
						endereco: vEndereco,
						telefone: vTelefone,
						data: vData
					},
					dataType: "json", 
					success: function (json) {
						if(json.result == true){
							console.log(json.err);
						}
						else{
							console.log(json.err);
						}
						if(json.alert == true){
							alert(json.err);
						}
						else if(json.result == true){
							alert('Agendamento feito com sucesso');
							document.getElementById('AgndNome').value = "";
							document.getElementById('AgndTelefone').value = "";
							document.getElementById('AgndData').value = "";
							document.getElementById('AgndEndereco').value = "";
							
						}
					},
					error: function(){
						console.log("##error");
					}
				});
			}
		},
//----------------------------------------------------------------------------------- VER AGENDAMENTOS ------------------------------------------------------------------------
	vAgenda: function(){$.ajax({
            type: "GET",
            url: "http://localhost/index.php",
            data: {
                acao: 'veragendamentos',
            },
            dataType: "json",
            success: function (json) {
                if(json){
					console.log(json);
						var tr="";
						for(var i = 0; i < json.length; i++){
							tr += '<div data-role="collapsible" data-corners="false" class="ui-corner-none" data-collapsed="false">'
							tr +=	'<h2 class="ui-collapsible-heading"><a class="ui-collapsible-heading-toggle ui-btn ui-btn-icon-left ui-btn-up-d" href="#" data-corners="false" data-shadow="false" data-iconshadow="true" data-icon="plus" data-iconpos="left" data-theme="a">'
							tr +=		'<span class="ui-btn-text">'+ json[i].nome +'</span>'
							tr +=	'</a></h2>'
							tr +=	'<div class="ui-body ui-body-d ui-textalign-left">'
							tr +=		'<!-- profile fields -->'		  
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Telefone</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>'+ json[i].telefone
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Data</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].data
							tr +=		'<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'><div class="left-table">Endereco</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].endereco
							tr +=       '<hr>'
							tr +=		'<div class="tablerow">'
							tr +=			'<div class="left-table">Horario</div>'
							tr +=			'<div  class="right-table"></div>'
							tr +=		'</div>' + json[i].horario 
							tr +=		'</div>'
							tr +=	'</div>'
						 document.getElementById('MOSTRARAGEND').innerHTML = tr;           
						}
                }
                else{
					console.log(json);
                }
            },
            error: function(){
                console.log("##cliente::error");
            }
        })
	}
}
app.initialize();
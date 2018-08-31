<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'hypertrash 2.0');
 
$request = $_SERVER['REQUEST_METHOD'] == 'GET' ? $_GET : $_POST;

 
switch ($request['acao']) {
	case "usuarios":
		if (mysqli_connect_errno()) trigger_error(mysqli_connect_error());
		
		//Consultando banco de dados
		$vetor;
		$qryLista = mysqli_query($conn, "SELECT * FROM cooperativa");   
		while($resultado = mysqli_fetch_assoc($qryLista)){
			$vetor[] = array_map('utf8_encode', $resultado); 
		}    		
		//Passando vetor em forma de json
		if($vetor){
			echo json_encode($vetor);
		}
		else{
			echo "Sem usuarios";
		}
	break;
	/* ----------------------------- */
	case "veragendamentos":
		if (mysqli_connect_errno()) trigger_error(mysqli_connect_error());
		
		//Consultando banco de dados
		$vetor;
		$qryLista = mysqli_query($conn, "SELECT * FROM servicos");   
		while($resultado = mysqli_fetch_assoc($qryLista)){
			$vetor[] = array_map('utf8_encode', $resultado); 
		}    		
		//Passando vetor em forma de json
		if($vetor){
			echo json_encode($vetor);
		}
		else{
			echo "Sem usuarios";
		}
	break;
	/* ----------------------------- */
	case "login":
		$email = addslashes($_POST['email']);
		$senha = addslashes($_POST['senha']);
		$sql = "SELECT id, nome, email, telefone, senha FROM usuario WHERE email = '$email' && senha = '$senha'";
		$arr = array();	
		$arr['result'] = false;
		$arr['err'] = 'vazio';
		$rr = $conn->query($sql);
		if(mysqli_num_rows($rr)==1){
			$arr['result'] = true;
			$arr['alert'] = false;
			$arr['err'] = '##server::Logado';
			$rowz = mysqli_fetch_row($rr);
			$arr['id'] = $rowz[0];
			$arr['nome'] = $rowz[1];
			$arr['email'] = $rowz[2];
			$arr['telefone'] = $rowz[3];
			$arr['senha'] = $rowz[4];
		} 
		else{
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = 'O nome de usuário ou senha está incorreta, ou não existe';			
		}
		echo json_encode($arr);		
	break;
	/* ------------------------------------------------------------------------------------ */	
	case "registrarUsuario":
		$nome = addslashes($_POST['nome']);
		$email = addslashes($_POST['email']);
		$telefone = addslashes($_POST['telefone']);
		$senha = addslashes($_POST['senha']);	
		$sql = "INSERT INTO usuario (nome, email, telefone, senha) VALUES ('$nome', '$email', '$telefone', '$senha')";
		$arr = array();
		$arr['result'] = false;
		$arr['err'] = 'vazio';
		$duplicata = $conn->query("SELECT * FROM usuario WHERE email = '$email'");
		$cc = $duplicata->num_rows;
		$duplicata2 = $conn->query("SELECT * FROM usuario WHERE telefone = '$telefone'");
		$cc2 = $duplicata2->num_rows;
		if($cc>0){
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = "Email já cadastrado";
		}
		else if($cc2>0){		
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = "Telefone já cadastrado";			
		}
		else if ($conn->query($sql)) {			
			$arr['result'] = true;
			$arr['alert'] = false;
			$arr['err'] = "##server::New record created successfully";
		} 
		else {
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = "##server::Unknown Error: '$sql'";
		}	
		echo json_encode($arr);		
	break;
	/* ------------------------------------------------------------------------- */
	case "logincoop":
		$email = addslashes($_POST['email']);
		$senha = addslashes($_POST['senha']);
		$sql = "SELECT id, nome, email, telefone, endereco, senha FROM cooperativa WHERE email = '$email' && senha = '$senha'";
		$arr = array();	
		$arr['result'] = false;
		$arr['err'] = 'vazio';
		$rr = $conn->query($sql);
		if(mysqli_num_rows($rr)==1){
			$arr['result'] = true;
			$arr['alert'] = false;
			$arr['err'] = '##server::Logado';
			$rowz = mysqli_fetch_row($rr);
			$arr['id'] = $rowz[0];
			$arr['nome'] = $rowz[1];
			$arr['email'] = $rowz[2];
			$arr['telefone'] = $rowz[3];
			$arr['senha'] = $rowz[4];
		} 
		else{
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = 'O nome de usuário ou senha está incorreta, ou não existe';			
		}
		echo json_encode($arr);		
	break;
	/*---------------------------------------------------------------------------*/
	case "registrarCooperativa":
		$nome = addslashes($_POST['nome']);
		$email = addslashes($_POST['email']);
		$telefone = addslashes($_POST['telefone']);
		$endereco = addslashes($_POST['endereco']);
		$senha = addslashes($_POST['senha']);	
		$sql = "INSERT INTO cooperativa (nome, email, telefone, endereco, senha) VALUES ('$nome', '$email', '$telefone', '$endereco', '$senha')";
		$arr = array();
		$arr['result'] = false;
		$arr['err'] = 'vazio';
		$duplicata = $conn->query("SELECT * FROM cooperativa WHERE email = '$email'");
		$cc = $duplicata->num_rows;
		$duplicata2 = $conn->query("SELECT * FROM cooperativa WHERE telefone = '$telefone'");
		$cc2 = $duplicata2->num_rows;
		if($cc>0){
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = "Email já cadastrado";
		}
		else if($cc2>0){		
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = "Telefone já cadastrado";			
		}
		else if ($conn->query($sql)) {			
			$arr['result'] = true;
			$arr['alert'] = false;
			$arr['err'] = "##server::New record created successfully";
		} 
		else {
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = "##server::Unknown Error: '$sql'";
		}	
		echo json_encode($arr);		
	break;
	/*---------------------------------------------------------------------------*/
	case "serviços":
		$nomeusuario = addslashes($_POST['nome']);
		$enderecousuario = addslashes($_POST['endereco']);
		$telefoneusuario = addslashes($_POST['telefone']);
		$dataservico = addslashes($_POST['data']);
		//$nomecooperativa = addslashes($_POST['nome']);
		//$telefonecooperativa = addslashes($_POST['telefone']);
		//$local = addslashes($_POST['local']);
		$sql = "INSERT INTO servicos(nomeusuario, enderecousuario, telefoneusuario, dataservico) VALUES ('$nomeusuario','$enderecousuario', '$telefoneusuario', '$dataservico')";
		$arr = array();
		$arr['result'] = false;
		$arr['err'] = 'vazio';
		if ($conn->query($sql)) {			
			$arr['result'] = true;
			$arr['alert'] = false;
			$arr['err'] = "##server::New record created successfully";
		} 
		else {
			$arr['result'] = false;
			$arr['alert'] = true;
			$arr['err'] = "##server::Unknown Error: '$sql'";
		}	
		echo json_encode($arr);		
	break;

}
?>
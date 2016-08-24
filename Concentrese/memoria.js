var idImg="";
var imgAbierta="";
var contador = 0;
var intentos =  0;
var tiempoId = 0;

//Funcion principal
$(document).ready(function(){
	$("img").hide();
	$("#imagenes div").click(abrirImagen);
	mezclarImagenes();
	abrirImagen();
});

function iniciarJuego(){
	mezclarImagenes();
	$("img").hide();
	$("img").removeClass("opacity");
    $("#msg1").remove();
    idImg = "";
    imgAbierta = "";
    intentos = 0;
    $("#tiempo").html("0");
    clearTimeout(tiempoId);
    contadorTiempo();
    return false;
}

function abrirImagen() {		
		//Obtenemos el id del elemento al que hacemos clic
        id = $(this).attr("id");

        if ($("#"+id+" img").is(":hidden")) {
            $("#imagenes div").unbind("click", abrirImagen);
	
            $("#"+id+" img").slideDown('fast');

            if (imgAbierta == "") {
                idImg = id;
                imgAbierta = $("#"+id+" img").attr("src");
                setTimeout(function() {
                    $("#imagenes div").bind("click", abrirImagen)
                }, 300);
            } else {
                actual = $("#"+id+" img").attr("src");				
                if (imgAbierta != actual) {
                    // Cerrar las imagenes abiertas
                    setTimeout(function() {
                        $("#"+id+" img").slideUp('fast');
                        $("#"+idImg+" img").slideUp('fast');
                        idImg = "";
                        imgAbierta = "";
                    }, 400);
                } else {
                    // Coinciden
                    $("#"+id+" img").addClass("opacar");
                    $("#"+idImg+" img").addClass("opacar");
                    intentos++;
                    idImg = "";
                    imgAbierta = "";
                }

                setTimeout(function() {
                    $("#imagenes div").bind("click", abrirImagen)
                }, 400);
            }
			 
			 if(intentos ==6){
				msg= '<span id=msg1> ¡ Felicidades terminaste el juego ! </span>';
				$("#msgTiempo").prepend(msg);
			 }
        }
    }


function imagenesAleatorias(limite){
  //Devuelve el menor entero redondeado un numero con parte decimal
    return Math.floor( Math.random() * limite);
}

function mezclarImagenes(){
  //Obtenga los hijos de cada elemento del contenedor
  var imagenes = $("#imagenes").children();
  //Seleccione todos los elementos que son primeros hijos de su padre
  var imagen = $("#imagenes div:first-child");
  var arrayImagen = new Array();

  //Recorremos el array de imagenes para asignarles la url aleatoriamente
  for(i=0;i<imagenes.length; i++){
    //Nos permite recuperar y modificar el valor de un atributo
    //$(elemento).attr(atributo, valor);
    arrayImagen[i]=$("#"+imagen.attr("id")+" img").attr("src");
    imagen = imagen.next();
  }

  //Se asigna el valor de src de acuerdo a la posicion aleatoria
  var imagen=$("#imagenes div:first-child");
  for(j=0;j<imagenes.length;j++){
    indiceAleatorio= imagenesAleatorias(arrayImagen.length -1);
    $("#"+imagen.attr("id")+" img").attr("src", arrayImagen[indiceAleatorio]);
    //Adicionar Imagen iniciando en la posicion aleatoria
    arrayImagen.splice(indiceAleatorio,1);
    imagen = imagen.next();
  }
  
  function contadorTiempo()
  {
	var tiempo = $("#tiempo").html();
	tiempo++;
	$("#tiempo").html("" + tiempo);
	if (intentos<10)
	{
		tiempoId = setTimeout(contadorTiempo(), 1000);
	}
}


}



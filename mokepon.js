let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

//2.-
function iniciarJuego(){
    //ocultamos la seccion ataque hasta que el usuario haya seleccionado mascota
    let sectionAtaque = document.getElementById('seleccionar-ataque')
    sectionAtaque.style.display = 'none'
    //se oculta boton reiniciar tambien
    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.style.display = 'none'

//se declara la variable, se iguala al valor del objeto document, que a su vez ejecuta su metodo getelement, para acceder a la propiedad html a traves de su id
    let seleccionarMascotaJugador = document.getElementById("boton-mascota")
    //ahora a la variable creada, llamamos a su metodo addeventlistener para escuchar cuando de click, y mandamos llamar la funcion selecciona juador
    seleccionarMascotaJugador.addEventListener('click', seleccionarJugador)

    //8.- creamos las variables para interactuar con los botones de los ataques, y agregamos el escuchador, crendo su funcion
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click',ataqueAgua)
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click',ataqueFuego)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click',ataqueTierra)
    //al presionarlo mandamos llamar a la funcion reiniciarJuego
    botonReiniciar.addEventListener('click',reiniciarJuego)

}

//3.- una vez que presionamos el boton "seleccionar"
function seleccionarJugador(){
    //cambiamos la propiedad a flex para aparecer la seccion seleccionar ataque
    let sectionAtaque = document.getElementById('seleccionar-ataque')
    sectionAtaque.style.display = 'flex'
    //ocultamos la seccion seleccionar mascota
    let sectionMascota = document.getElementById('seleccionar-mascota')
    sectionMascota.style.display = 'none'
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')

    //4.- se crea var para agregar en el htmll utilizando la propiedad innerHTML y modificando su valor
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    //el checked se utiliza para saber si el input esta seleccionado, y retorna TRUE or FALSE
    if(inputHipodoge.checked){ 
        spanMascotaJugador.innerHTML = "Hipodoge"
    }
    else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = "Capipepo"
    }
    else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = "Ratigueya"
    }
    else{
        alert("Selecciona una Mascota para continuar")
    }
    //5.- mandamos llamar a la funcion justo despues de seleccionar el la mascota-jugador
    seleccionarEnemigo()
    
}

//6.- creamos la funcion de enemigo
function seleccionarEnemigo(){
    //creamos la variable que almacenara el valor de la funcion aleatorio
    let mascotaAleatorio = numeroAleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if(mascotaAleatorio == 1){
        //7.- se mmodifica el html de la mascota del enemigo
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    }else if(mascotaAleatorio == 2){
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    }else
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
        
}

//8.- se crean las funciones para cada ataque, y se modifican segun su eleccion 
function ataqueAgua(){
    ataqueJugador = 'AGUA'
    //alert('Elegiste: ' + ataqueJugador)
    //10.- inmediatamente llamamos la funcion del ataque del enemigo
    ataqueDelEnemigo(ataqueJugador)
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    //alert('Elegiste: ' + ataqueJugador)
    ataqueDelEnemigo(ataqueJugador)
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    //alert('Elegiste: ' + ataqueJugador)
    ataqueDelEnemigo(ataqueJugador)
}

//9.-se crea la funcion para elegir el ataque del enemigo
function ataqueDelEnemigo(){
    let ataqueAleatorio = numeroAleatorio(1,3)
    //let spanAtaqueEnemigo = document.getElementById('ataque-enemigo')

    if(ataqueAleatorio == 1){
        ataqueEnemigo = "FUEGO"
       // alert("El ataque del enemigo fue: " + ataqueEnemigo)
       // spanAtaqueEnemigo.innerHTML = ataqueEnemigo
    }
    else if(ataqueAleatorio == 2){
        ataqueEnemigo = "AGUA"
        //alert("El ataque del enemigo fue: " + ataqueEnemigo)
        //spanAtaqueEnemigo.innerHTML = ataqueEnemigo
    }
    else {
        ataqueEnemigo = "TIERRA"
        //alert("El ataque del enemigo fue: " + ataqueEnemigo)
        //spanAtaqueEnemigo.innerHTML = ataqueEnemigo
    }
    //mandamos llamar la funcion combate, y ahi utilizamos la de crearmensaje()
    combate()
}

//creamos funcion para separar la logica del ataque, y ahhi mandamos llamar a la funcion que cree el mensaje dell ganador
function combate(){
    //creamos las variables para acceder al span de vidas
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if(ataqueJugador == ataqueEnemigo){
        //se pasan los arrgumentos con el resultado directamente a la funcion para ser utilizados con su valor final
        crearMensaje("EMPATE 😒")
    }
    else if(ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA" || ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO" || ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        crearMensaje("GANASTE!! 🏆")
        //decrementamos la variable global, para proporcionar la informacion en pantalla
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        crearMensaje("PERDISTE 😭")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas(){
    //validamos las vidas del jugador y enemigo en esta funcion 
    if(vidasJugador == 0){
        crearMensajeFinal("Lo sentimos, perdiste, intenta nuevamente 🥹")
        //manda llamar a la funcion finDelJuego
        finDelJuego()
    }else if(vidasEnemigo == 0){
        crearMensajeFinal("Felicidades, GANASTE! el juego ha llegado a su fin 🥳")
        finDelJuego()
    }
}

//deshabilita los botones una vez que alguien perdio
function finDelJuego(){
    document.getElementById('boton-agua').disabled = true
    document.getElementById('boton-fuego').disabled = true
    document.getElementById('boton-tierra').disabled = true

    //creamos boton reiniciar
    let botonReiniciar = document.getElementById("boton-reiniciar")
    //reapaecemos el boton reiniciar
    botonReiniciar.style.display = 'flex'
    
}

function crearMensaje(resultado){
    //accedemos pos su id a la seccion que queremos modificar
    //id resultado es la seccion a la que queremos acceder
    let sectionMensajes = document.getElementById('resultado')
    let divAtaqueDelJugador = document.getElementById('ataque-del-jugador')
    let divAtaqueDelEnemigo = document.getElementById('ataque-del-enemigo')
    
    //creamos otra variable para parrafo que queremos agregar y decimos el tipo de elemento que queremos en este caso uno de tipo p
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    //agregamos el parrafo con el metodo innerHTML
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    // parrafo.innerHTML = 'Tu mascota ataco con: ' + ataqueJugador + ', la mascota del enemigo ataco con: ' + ataqueEnemigo + ' --> ' + resultado
    
    //agregamos el parafo accediendo al meodo de la seccion/div
    divAtaqueDelJugador.appendChild(nuevoAtaqueJugador)
    divAtaqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
    //document.body.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal){
    let seccionMensaje = document.getElementById('resultado')
    seccionMensaje.innerHTML = resultadoFinal
}

function reiniciarJuego(){
    window.location.reload();
}

function numeroAleatorio(min, max) {
    //math es una clase
    //la funcion floor quita los decimales
    return Math.floor(Math.random() * (max - min + 1) + min)
}

 //1.- se carga codigo js una vez que todos los elementos de html ya existan, de esta manera el evento load una vez que caga el navegador ejecuta el codigo js y la funcion
window.addEventListener('load', iniciarJuego)
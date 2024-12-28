//iniciarjuego
const sectionAtaque = document.getElementById('seleccionar-ataque')
const botonReiniciar = document.getElementById('boton-reiniciar')
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonAgua = document.getElementById('boton-agua')
const botonFuego = document.getElementById('boton-fuego')
const botonTierra = document.getElementById('boton-tierra')

//seleccionarMascotaEnemigo
const sectionMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

//seleccioarEnemigo
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

//combate
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

//finDelJuego

//crearMensaje
const sectionMensajes = document.getElementById('resultado')
const divAtaqueDelJugador = document.getElementById('ataque-del-jugador')
const divAtaqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
//crearMensajeFinal
//let sectionMensajes = document.getElementById('resultado')

//Arreglo que almacena la cantidad de mokepones
let mokepones = []
//genera la representacion visual y por lo tanto dinamica de html desde js
let opcionDeMokepones 
let ataqueJugador
let ataqueEnemigo
//inicializamos a este punto para evitar el error de injeccion de js en lineas anteriores por no encontrar su valor en html
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let vidasJugador = 3
let vidasEnemigo = 3


//agregando class, siempre empieza con mayuscula
//El plano o molde para creacion de objetos
class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        //no va en el constructor ya que, no queremos que sea parte de todos los objetos sino que se mannipule diferente
        this.ataques = []
    }
}

//objetos
//usando el constructor para crear objetos de la clase Mokepon

//objetos instancia
let hipodoge = new Mokepon('Hipodoge', './assets/mokepon-agua.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepon-tierra.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepon-fuego.png', 5)

//almacena la informacion de los mokepoes
//mokepones.push(hipodoge,capipepo,ratigueya)

//objetos iterarios 
hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)
//hipodoge.ataques.push()

//agregamos la informacion de los objetos al arreglo principal
mokepones.push(hipodoge,capipepo,ratigueya)

//2.-
function iniciarJuego(){
    //ocultamos la seccion ataque hasta que el usuario haya seleccionado mascota
    
    sectionAtaque.style.display = 'none'
    //se oculta boton reiniciar tambien
    
    //agregamos de manera dinamica el codigo de tarjetas en HTML pero desde JS
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}">
            <label class="caja-label" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}">
            </label>`

            //se inyecta el ccodigo js obtenido de html con el resultado del id de manera dinamic, y se agrega el += para que agregue todos los valores del forEach
            contenedorTarjetas.innerHTML += opcionDeMokepones

        //una vez que se crean los personajes, accedemos a ellos a traves de su id, no antes
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')

    })

    botonReiniciar.style.display = 'none'

//se declara la variable, se iguala al valor del objeto document, que a su vez ejecuta su metodo getelement, para acceder a la propiedad html a traves de su id
    
    //ahora a la variable creada, llamamos a su metodo addeventlistener para escuchar cuando de click, y mandamos llamar la funcion selecciona juador
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    //8.- creamos las variables para interactuar con los botones de los ataques, y agregamos el escuchador, crendo su funcion
    
    botonAgua.addEventListener('click',ataqueAgua)
    
    botonFuego.addEventListener('click',ataqueFuego)
    
    botonTierra.addEventListener('click',ataqueTierra)
    //al presionarlo mandamos llamar a la funcion reiniciarJuego
    botonReiniciar.addEventListener('click',reiniciarJuego)

}

//3.- una vez que presionamos el boton "seleccionar"
function seleccionarMascotaJugador(){
    //cambiamos la propiedad a flex para aparecer la seccion seleccionar ataque
    
    sectionAtaque.style.display = 'flex'
    //ocultamos la seccion seleccionar mascota
    
    sectionMascota.style.display = 'none'
    
    //4.- se crea var para agregar en el htmll utilizando la propiedad innerHTML y modificando su valor
    
    //el checked se utiliza para saber si el input esta seleccionado, y retorna TRUE or FALSE
    if(inputHipodoge.checked){ 

        //spanMascotaJugador.innerHTML = "Squirtle"
        spanMascotaJugador.innerHTML = inputHipodoge.id
    }
    else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
    }
    else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
    }
    else{
        alert("Selecciona una Mascota para continuar")
    }
    //5.- mandamos llamar a la funcion justo despues de seleccionar el la mascota-jugador
    seleccionarMascotaEnemigo()
    
}

//6.- creamos la funcion de enemigo
function seleccionarMascotaEnemigo(){
    //creamos la variable que almacenara el valor de la funcion aleatorio
    let mascotaAleatorio = numeroAleatorio(1,mokepones.length -1)
    
    //se modifica a solo esta linea, en lugar de las validaciones posteriores, accediendo directamente a la posicion del arreglo de manera dinamica
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    // if(mascotaAleatorio == 1){
    //     //7.- se mmodifica el html de la mascota del enemigo
    //     spanMascotaEnemigo.innerHTML = 'Squirtle'
    // }else if(mascotaAleatorio == 2){
    //     spanMascotaEnemigo.innerHTML = 'Bulbasaur'
    // }else
    //     spanMascotaEnemigo.innerHTML = 'Charmander'
        
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
    
    botonAgua.disabled = true   
    
    botonFuego.disabled = true
    
    botonTierra.disabled = true

    //creamos boton reiniciar
    
    //reapaecemos el boton reiniciar
    botonReiniciar.style.display = 'flex'
    
}

function crearMensaje(resultado){
    //accedemos pos su id a la seccion que queremos modificar
    //id resultado es la seccion a la que queremos acceder
    
    
    
    
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
    
    sectionMensajes.innerHTML = resultadoFinal
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
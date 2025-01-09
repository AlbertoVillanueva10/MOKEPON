//const { Dropdown } = require("bootstrap")

//iniciarjuego
const sectionAtaque = document.getElementById('seleccionar-ataque')
const botonReiniciar = document.getElementById('boton-reiniciar')
const botonMascotaJugador = document.getElementById("boton-mascota")

/**
 * se eliminan de html para agregarlos dinamicamente
let botonAgua = document.getElementById('boton-agua')
let botonFuego = document.getElementById('boton-fuego')
let botonTierra = document.getElementById('boton-tierra')
 */

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
const contenedorAtaques = document.getElementById("contenedor-ataques")
//crearMensajeFinal
//let sectionMensajes = document.getElementById('resultado')

//**Canvas const
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
let lienzo = mapa.getContext("2d")


//Arreglo que almacena la cantidad de mokepones
let mokepones = []
//genera la representacion visual y por lo tanto dinamica de html desde js
let opcionDeMokepones 
let ataqueJugador = []
let ataqueEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
//inicializamos a este punto para evitar el error de injeccion de js en lineas anteriores por no encontrar su valor en html
let inputSquirtle 
let inputBulbasaur 
let inputCharmander 
let mascotaJugador
//seccion botones ataques dinamicos
//var para almacenar los ataques del mokepon
let ataquesMokepon
let ataquesMokeponEnemigo
let botonAgua 
let botonFuego 
let botonTierra
//nuevo arreglo para guardar los botones y sus id *
let botones = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let seleccionJugador = 1
let intervalo 


//agregando class, siempre empieza con mayuscula
//El plano o molde para creacion de objetos
class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        //no va en el constructor ya que, no queremos que sea parte de todos los objetos sino que se mannipule diferente
        this.ataques = []
        this.x = 20
        this. y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto 
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

//objetos
//usando el constructor para crear objetos de la clase Mokepon

//objetos instancia
let squirtle = new Mokepon('Squirtle', './assets/mokepon-agua.png', 5)
let bulbasaur = new Mokepon('Bulbasaur', './assets/mokepon-tierra.png', 5)
let charmander = new Mokepon('Charmander', './assets/mokepon-fuego.png', 5)

//almacena la informacion de los mokepoes
//mokepones.push(Squirtle,Bulbasaur,Charmander)

//objetos iterarios 
squirtle.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

bulbasaur.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
)

charmander.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)
//squirtle.ataques.push()

//agregamos la informacion de los objetos al arreglo principal
mokepones.push(squirtle,bulbasaur,charmander)

//2.-
function iniciarJuego(){
    //ocultamos la seccion ataque hasta que el usuario haya seleccionado mascota
    
    sectionAtaque.style.display = 'none'
    //se oculta boton reiniciar tambien
    //** CANVAS SECTION */
    sectionVerMapa.style.display = 'none'
    
    //agregamos de manera dinamica el codigo de tarjetas en HTML pero desde JS
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}">
        <label class="caja-label" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>`

        //se inyecta el ccodigo js obtenido de html con el resultado del id de manera dinamica, y se agrega el += para que agregue todos los valores del forEach
        contenedorTarjetas.innerHTML += opcionDeMokepones

        //una vez que se crean los personajes, accedemos a ellos a traves de su id, no antes
        inputSquirtle = document.getElementById('Squirtle')
        inputBulbasaur = document.getElementById('Bulbasaur')
        inputCharmander = document.getElementById('Charmander')

    })

    botonReiniciar.style.display = 'none'

//se declara la variable, se iguala al valor del objeto document, que a su vez ejecuta su metodo getelement, para acceder a la propiedad html a traves de su id
    
    //ahora a la variable creada, llamamos a su metodo addeventlistener para escuchar cuando de click, y mandamos llamar la funcion selecciona juador
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    //8.- creamos las variables para interactuar con los botones de los ataques, y agregamos el escuchador, crendo su funcion
    
    //al presionarlo mandamos llamar a la funcion reiniciarJuego
    botonReiniciar.addEventListener('click',reiniciarJuego)
}

//3.- una vez que presionamos el boton "seleccionar"
function seleccionarMascotaJugador(){
    //cambiamos la propiedad a flex para aparecer la seccion seleccionar ataque
    
    sectionMascota.style.display = 'none'
    
    //**ocultamos la seccion seleccionar mascota
    //sectionAtaque.style.display = 'none'

    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
    //4.- se crea var para agregar en el html utilizando la propiedad innerHTML y modificando su valor
    
    //el checked se utiliza para saber si el input esta seleccionado, y retorna TRUE or FALSE
    if(inputSquirtle.checked){ 
        //spanMascotaJugador.innerHTML = "Squirtle"
        spanMascotaJugador.innerHTML = inputSquirtle.id
        //agregamos el valor del id a la nueva var mascotaJugador
        mascotaJugador = inputSquirtle.id
    }
    else if(inputBulbasaur.checked){
        spanMascotaJugador.innerHTML = inputBulbasaur.id
        mascotaJugador = inputBulbasaur.id
    }
    else if(inputCharmander.checked){
        spanMascotaJugador.innerHTML = inputCharmander.id
        mascotaJugador = inputCharmander.id
    }
    else{
        alert("Selecciona una Mascota para continuar")
        window.location.reload();
    }

    extraerAtaques(mascotaJugador)
    //5.- mandamos llamar a la funcion justo despues de seleccionar el la mascota-jugador
    seleccionarMascotaEnemigo()
    
}

function jugadorNoSeleccionado(){

}

//se crea funcion para mostrar ataques del jugador, a traves del arreglo mokepones
function extraerAtaques(mascotaJugador){
    let ataques 
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    //console.log(ataques)
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    // for (let i = 0; i < ataques.length; i++) {
    //     const element = ataques[i].id;
    //     console.log(element)
    // }

    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button class="btn-ataques btnAtaque BAtaque" id=${ataque.id}>${ataque.nombre}</button>
        `

        //se agregan los botones dinamicamente desde js
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    //traemos los botones y sus metodos de click para que los detecte una vez creados dinamicamente
    botonAgua = document.getElementById('boton-agua')
    botonFuego = document.getElementById('boton-fuego')
    botonTierra = document.getElementById('boton-tierra')
    //se manda llamar todos los elementos con BAtaque que se agrega en la injeccion, pero con un . ya que es una clase
    botones = document.querySelectorAll('.BAtaque')
    console.log(botones)
    /**De igual manera esta parte ya no es necesaria
    botonAgua.addEventListener('click',ataqueAgua)
    botonFuego.addEventListener('click',ataqueFuego)
    botonTierra.addEventListener('click',ataqueTierra)
     */
}

//se crea una nueva funcion
function secuenciaAtaque(){
    //en el arreglo botones, por cada boton se ejecuta un arrow function
    botones.forEach((boton) => {
        //enseguida al boton en si, se le agrega el evento click y se accede a el a traves del mismo evento
        boton.addEventListener('click', (e) => {
            //validamos con la propiedad del icono textContent
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#1f509a7f'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#1f509a7f'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#1f509a7f'
                boton.disabled = true
            }
            ataqueDelEnemigo()
        })
    })

}

//6.- creamos la funcion de enemigo
function seleccionarMascotaEnemigo(){
    //creamos la variable que almacenara el valor de la funcion aleatorio
    let mascotaAleatorio = numeroAleatorio(1,mokepones.length -1)
    
    //se modifica a solo esta linea, en lugar de las validaciones posteriores, accediendo directamente a la posicion del arreglo de manera dinamica
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
        
}

//9.-se crea la funcion para elegir el ataque del enemigo
function ataqueDelEnemigo(){
    //quitamos el hardcode y agregamos directamente la informacion desde la variable del enemigo 
    let ataqueAleatorio = numeroAleatorio(0,ataquesMokeponEnemigo.length -1 )
    //let spanAtaqueEnemigo = document.getElementById('ataque-enemigo')

    //**
    // QUITAR LO HARDCODE DE ESTA FUNCION UTILIZANDO ATAQUESMOQUEPONENEMIGO 
    //  */


    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push("FUEGO")
       // alert("El ataque del enemigo fue: " + ataqueEnemigo)
       // spanAtaqueEnemigo.innerHTML = ataqueEnemigo
    }
    else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push("AGUA")
        //alert("El ataque del enemigo fue: " + ataqueEnemigo)
        //spanAtaqueEnemigo.innerHTML = ataqueEnemigo
    }
    else {
        ataqueEnemigo.push("TIERRA")
        //alert("El ataque del enemigo fue: " + ataqueEnemigo)
        //spanAtaqueEnemigo.innerHTML = ataqueEnemigo
    }
    console.log(ataqueEnemigo)
    //mandamos llamar la funcion combate, y ahi utilizamos la de crearmensaje()
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5)
    combate()
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

//creamos funcion para separar la logica del ataque, y ahhi mandamos llamar a la funcion que cree el mensaje dell ganador
function combate(){
    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]){
            console.log(ataqueJugador[i])
            indexAmbosOponentes(i,i)
            crearMensaje("EMPATE 😒")
        }
        else if(ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA" || ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO" || ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA"){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE!! 🏆")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else{
            indexAmbosOponentes(i,i)
            crearMensaje("PERDISTE 😭")
            victoriasEnemigo ++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    /**
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
    */

    revisarVidas()
}

function revisarVidas(){
    //validamos las vidas del jugador y enemigo en esta funcion 
    if(victoriasJugador < victoriasEnemigo){
        crearMensajeFinal("Lo sentimos, perdiste, intenta nuevamente 🥹")
        finDelJuego()
    }else if(victoriasEnemigo < victoriasJugador){
        crearMensajeFinal("Felicidades, GANASTE! el juego ha llegado a su fin 🥳")
        finDelJuego()
    }else
    {
        crearMensajeFinal("Empate, sigue intentando 😒")
        finDelJuego()
    }
}

//deshabilita los botones una vez que alguien perdio
function finDelJuego(){
    
    //creamos boton reiniciar
    //reapaecemos el boton reiniciar
    botonReiniciar.style.display = 'flex'
    console.log("Funcion fin del juego")
    
}

function crearMensaje(resultado){
    //accedemos pos su id a la seccion que queremos modificar
    //id resultado es la seccion a la que queremos acceder
    
    //creamos otra variable para parrafo que queremos agregar y decimos el tipo de elemento que queremos en este caso uno de tipo p
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    //agregamos el parrafo con el metodo innerHTML
    sectionMensajes.innerHTML = resultado
    //se modifican estas variables con las de los index de cada arreglo
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    

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

function pintarPersonaje(){
    bulbasaur.x = bulbasaur.x + bulbasaur.velocidadX
    bulbasaur.y = bulbasaur.y + bulbasaur.velocidadY
    //funcion para limpiar el area antes de pintar
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        bulbasaur.mapaFoto,
        bulbasaur.x,
        bulbasaur.y,
        bulbasaur.ancho,
        bulbasaur.alto
    )
}

function moverDerechaBulbasaur(){
    bulbasaur.velocidadX = 5
}

function moverIzquierdaBulbasaur(){
    bulbasaur.velocidadX = -5
}

function moverArribaBulbasaur(){
    bulbasaur.velocidadY = -5
}

function moverAbajoBulbasaur(){
    bulbasaur.velocidadY = 5
}

function detenerMovimiento(){
    bulbasaur.velocidadX = 0
    bulbasaur.velocidadY = 0
}

function iniciarMapa(){
    intervalo = setInterval(pintarPersonaje,50)
    //evento para la presion de teclas, despues se crea la funcion
    window.addEventListener('keydown',sePresionoTecla)
    window.addEventListener('keyup',detenerMovimiento)
}

function sePresionoTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArribaBulbasaur()
            break
        case 'ArrowDown':
            moverAbajoBulbasaur()
            break
        case 'ArrowLeft':
            moverIzquierdaBulbasaur()
            break
        case 'ArrowRight':
            moverDerechaBulbasaur()
            break

        default:
            console.log(event.key + "-->" + "La tecla usada no mueve al personaje, utiliza flechas")
            break;
    }
}
 //1.- se carga codigo js una vez que todos los elementos de html ya existan, de esta manera el evento load una vez que caga el navegador ejecuta el codigo js y la funcion
window.addEventListener('load', iniciarJuego)
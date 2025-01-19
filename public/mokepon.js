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

//var para el servidor
let jugadorId = null
let enemigoId = null

//Arreglo que almacena la cantidad de mokepones
let mokepones = []
let mokeponesEnemigos = []
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
let mascotaJugadorObjeto
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
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

//**Var para hacer responsive segun la pantalla el mapa */

let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa)
    anchoDelMapa = anchoMaximoDelMapa -20

//agregando class, siempre empieza con mayuscula
//El plano o molde para creacion de objetos
class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        //no va en el constructor ya que, no queremos que sea parte de todos los objetos sino que se mannipule diferente
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = numeroAleatorio(0, mapa.width - this.ancho)
        this. y = numeroAleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
        )
    }
}

//objetos
//usando el constructor para crear objetos de la clase Mokepon

//objetos instancia
let squirtle = new Mokepon('Squirtle', './assets/mokepon-agua.png', 5, './assets/mokepon-agua.png')
let bulbasaur = new Mokepon('Bulbasaur', './assets/mokepon-tierra.png', 5, './assets/mokepon-tierra.png')
let charmander = new Mokepon('Charmander', './assets/mokepon-fuego.png', 5, './assets/mokepon-fuego.png')

//almacena la informacion de los mokepoes
//mokepones.push(Squirtle,Bulbasaur,Charmander)

const SQUIRTLE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
]

//objetos iterarios 
//... para que evite agregarlos como una "lista"
squirtle.ataques.push(... SQUIRTLE_ATAQUES)

const BULBASAUR_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
]

bulbasaur.ataques.push(...BULBASAUR_ATAQUES)

const CHARMANDER_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
]

charmander.ataques.push(...CHARMANDER_ATAQUES)

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

    unirseAlJuego()
}

//invocando al servidor de node js
function unirseAlJuego(){
    fetch("http://betos-macbook-pro.local:8080/unirse")
        .then(function (res){
            console.log(res)
            if(res.ok){
                res.text()
                .then(function (respuesta){
                    console.log(respuesta );
                    jugadorId = respuesta 
                    
                })
            }
            

        })
}

//3.- una vez que presionamos el boton "seleccionar"
function seleccionarMascotaJugador(){
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
        //window.location.reload();
        //**Finaliza el flujo de la funcion, y hace que ya no continue hasta que una condicional sea verdadera*/
        return
    }

    sectionMascota.style.display = 'none'
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    //5.- mandamos llamar a la funcion justo despues de seleccionar el la mascota-jugador
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    //**seleccionarMascotaEnemigo()
    
}

//**ejecuta un fetch para el backend */
function seleccionarMokepon(mascotaJugador){
    fetch(`http://betos-macbook-pro.local:8080/mokepon/${jugadorId}`,{
        method: "post",
        //metadatos
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
     })
}

// function jugadorNoSeleccionado(){

// }

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
            //ataqueDelEnemigo()
            if(ataqueJugador.length == 5) {
                enviarAtaques()
            }
        })
    })

}

function enviarAtaques(){
    fetch(`http://betos-macbook-pro.local:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador 
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

//se obtienen ataques del enemigo
function obtenerAtaques(){
    fetch(`http://betos-macbook-pro.local:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length === 5){
                            ataqueEnemigo = ataques 
                            combate()
                        }
                    })
            }
        })
}

//6.- creamos la funcion de enemigo
function seleccionarMascotaEnemigo(enemigo){
    //creamos la variable que almacenara el valor de la funcion aleatorio
    //let mascotaAleatorio = numeroAleatorio(1,mokepones.length -1)
    
    //se modifica a solo esta linea, en lugar de las validaciones posteriores, accediendo directamente a la posicion del arreglo de manera dinamica
    //spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    //ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
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
    //se limpia la variable intervalo
    clearInterval(intervalo)
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

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    //funcion para limpiar el area antes de pintar
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    //**Funcion que pinta el jugador */
    mascotaJugadorObjeto.pintarMokepon()
    
    //**se envian las coordenadas al backend*/
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
    //**Funcion que pinta los enemigos */
    // squirtleEnemigo.pintarMokepon()
    // bulbasaurEnemigo.pintarMokepon()
    // charmanderEnemigo.pintarMokepon()   
    // if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
    //     revisarColision(squirtleEnemigo)
    //     revisarColision(bulbasaurEnemigo)
    //     revisarColision(charmanderEnemigo)
    // }
}

function enviarPosicion(x,y){
    fetch(`http://betos-macbook-pro.local:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },  
        body: JSON.stringify({
            x,
            y 
        })

    })
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({enemigos}){
                console.log(enemigos);
                mokeponesEnemigos = enemigos.map(function(enemigo){
                    let mokeponEnemigo = null 
                    //** todo esto viene del servior
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if(mokeponNombre === "Squirtle"){
                        mokeponEnemigo = new Mokepon('Squirtle', './assets/mokepon-agua.png', 5, './assets/mokepon-agua.png',enemigo.id)
                    }else if(mokeponNombre === "Bulbasaur"){
                        mokeponEnemigo = new Mokepon('Bulbasaur', './assets/mokepon-tierra.png', 5, './assets/mokepon-tierra.png',enemigo.id)
                    }
                    else if(mokeponNombre === "Charmander"){
                        mokeponEnemigo = new Mokepon('Charmander', './assets/mokepon-fuego.png', 5, './assets/mokepon-fuego.png',enemigo.id)
                    } 
                    //las cordenadas que los otros jugadores enviaron al servidor
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y
                    
                    //retornamos el objeto
                    return mokeponEnemigo
                })
                //**MOKEPONES ENEMIGOS */
            })
        }
    })
}

function moverDerechaBulbasaur(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierdaBulbasaur(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverArribaBulbasaur(){
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajoBulbasaur(){
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function iniciarMapa(){
    // mapa.width = 450
    // mapa.height = 350
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas,50)
    //evento para la presion de teclas, despues se crea la funcion
    window.addEventListener('keydown',sePresionoTecla)
    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
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

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota  < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return;
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    alert("Acabas de colisionar con " + enemigo.nombre + "!!")
    enemigoId = enemigo.id
}

 //1.- se carga codigo js una vez que todos los elementos de html ya existan, de esta manera el evento load una vez que caga el navegador ejecuta el codigo js y la funcion
window.addEventListener('load', iniciarJuego)
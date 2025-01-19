//libreria express importada
const express = require("express")
const cors = require("cors")

//genera una instancia del servidor, se crea una aplicacion
const app = express()
//para usar cors sin problemas
app.use(cors()) 
//funcion pata que las peticiones soporten el JSON como parte de su cuerpo 
app.use(express.json())

//lista de jugadores
const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }   

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
}

//cliente solicita recurso, a traves del servidor, endpoint
app.get("/unirse",(req, res) => {
    //manda una respuesta segun la direccion url y el puerto asignado para express en este caso 8080
    //no. aleatorio
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    //**Se establece una cabecera para las peticiones prompt, validando que un dominio en especifico sea valido y todos */
    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

//se hace la peticion mediante post
app.post("/mokepon/:jugadorId",(req, res) => {
     const jugadorId = req.params.jugadorId || ""
     const nombre = req.body.mokepon || ""
     const mokepon = new Mokepon(nombre)

     const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
     if(jugadorIndex >= 0 ){
        //**equivale al jugador en la lista
        jugadores[jugadorIndex].asignarMokepon(mokepon)
     }
     console.log(jugadores)
     console.log(jugadorId)
     res.end()
     
})

//para recibir las coordenadas y/o posicion del mokepon 
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x =  req.body.x || 0
    const y =  req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0 ){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
     }

     const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

     res.send({
        enemigos
     })
})


app.post("http//:localhost:8080/mokepon/:jugadorId/ataques",(req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0 ){
       //**equivale al jugador en la lista
       jugadores[jugadorIndex].asignarMokepon(ataques)
    }
    
    res.end()
    
})


//inicia el servidor, y se le da el puerto donde escuchara las peticiones
app.listen(8080, () => {
    console.log("Servidor funcionando")
})

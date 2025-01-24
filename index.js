//libreria express importada
const express = require("express")
const cors = require("cors")

//genera una instancia del servidor, se crea una aplicacion
const app = express()
//**Permite alojar informacion en el servidor para compartirla en ese apartado, a traves de la misma red wifi desde localhost */
app.use(express.static('public'))
//**RUTA iOS o Linux http://(nombre equipo con hostname)Betos/Macbook-Pro.local:8080
//**NOTA el archivo HTML tiene que llamarse index.html de lo contrario no lo encontrara
//** */ para windows ejecutar ipconfic en lugar de hostname, y poner la direccion ip de tu computador en el apartado WIFI*/
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

//app.post("http//:localhost:8080/mokepon/:jugadorId/ataques",(req, res) => {
app.post("/mokepon/:jugadorId/ataques",(req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0 ){
       //**equivale al jugador en la lista
       jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    
    res.end()
    
})

//app.get("/mokepon/:jugadorId/posicion", (req, res) => {
app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId )
    res.send({
        ataques: jugador.ataques || []
    })
})

//inicia el servidor, y se le da el puerto donde escuchara las peticiones
//**app.listen(8080, () => {
    console.log("Servidor funcionando")
//})
// Usa process.env.PORT en lugar de 8080
const port = process.env.PORT || 8080;  // Si no hay PORT definido, usa 8080 (para desarrollo local)
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
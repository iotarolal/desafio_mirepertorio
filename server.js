const express = require('express')
const { get_now, insertar, consultar, editar, eliminar, total_reps } = require('./db.js')

const app = express()
app.use(express.static('static'))


/*
● POST /cancion: Recibe los datos correspondientes a una canción y realiza la
inserción en la tabla repertorio.
● GET /canciones: Devuelve un JSON con los registros de la tabla repertorio.
● PUT /cancion: Recibe los datos de una canción que se desea editar y ejecuta una
función asíncrona para hacer la consulta SQL y actualice ese registro de la tabla
repertorio.
● DELETE /cancion: Recibe por queryString el id de una canción y realiza una consulta
SQL a través de una función asíncrona para eliminarla de la base de datos.

*/

app.post('/cancion', async (req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })
    req.on("end", async () => {

        //  desempaquetamos la respuesta
        const datos = Object.values(JSON.parse(body));

        // ejecutamos la  función insertar
        const algo = await insertar(datos[0], datos[1], datos[2])

        res.status(201)
    
        res.send(algo)
    })
})

app.get('/canciones', async (req, res) => {
    const canciones = await consultar()
    res.send(JSON.stringify(canciones))
})

app.put('/cancion', async (req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async () => {
        // desempaquetar respuesta
        const datos = Object.values(JSON.parse(body));

        // ejecutamos función editar
        const algo = await editar(Number(datos[0]), datos[1], datos[2], datos[3])

        console.log(algo)

        res.send(algo)
    
//        res.status(201).json(algo)
    })
})

app.delete('/cancion', async (req, res) => {
    await eliminar(req.query.id)
    res.send('Eliminado')
})


app.listen(3000, () => console.log('Servidor en puerto 3000'))
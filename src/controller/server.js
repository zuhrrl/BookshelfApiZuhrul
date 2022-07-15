const Hapi = require('@hapi/hapi')
const Routes = require('../routes/api/v1/routes')
const Host = 'localhost'
const Port = 5000

const initServer = async () => {
    const server = Hapi.server({
        'host' : Host,
        'port' : Port
    })

    // Define route
    server.route(Routes)

    // Start server
    await server.start()
    console.log(`Server is running in http://${Host}:${Port}`)

}

initServer()
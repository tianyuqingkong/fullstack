const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const loger = require('./utils/logger')

const server = http.createServer(app)
server.listen(config.PORT, () => {
  loger.info(`Server running on port ${config.PORT}`)
})
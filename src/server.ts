import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import categoryRoutes from './handlers/category'
import userRoutes from './handlers/user'
import regionRoutes from './handlers/region'
import sightingRoutes from './handlers/sighting'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

const corsOptions = {
  // origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req : express.Request, res : express.Response) {
  res.send('MEOW!')
})

categoryRoutes(app)
regionRoutes(app)
userRoutes(app)
sightingRoutes(app)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

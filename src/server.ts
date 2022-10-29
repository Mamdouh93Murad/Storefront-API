import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './handlers/user'
import productRoutes from './handlers/product'
import orderRoutes from './handlers/order'
import orderProductsRoutes from './handlers/orders_products'

const app: express.Application = express()
const address: string = '0.0.0.0:' + process.env.PORT

const corsOptions = {
  // origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req : express.Request, res : express.Response) {
  res.send('Welcome to Our Store!')
})

productRoutes(app)
userRoutes(app)
orderRoutes(app)
orderProductsRoutes(app)

app.listen(process.env.PORT, function () {
  console.log(`starting app on: ${address}`)
})

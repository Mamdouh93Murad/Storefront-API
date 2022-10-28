/* eslint-disable new-cap */
import express, { NextFunction, Request, Response } from 'express'
import { addedProduct, ordersProductsStore } from '../models/orders_products'
import logger from '../utilities/logger'
import jwt from 'jsonwebtoken'
// @ts-ignore
const verifyAuthToken = (req: Request, res: Response, next : NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    // eslint-disable-next-line no-unused-vars
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)

    next()
  } catch (error) {
    res.status(401)
  }
}

const store = new ordersProductsStore()

const index = async (_req: Request, res: Response) => {
  const order = await store.index()
  res.json(order)
}

const show = async (req: Request, res: Response) => {
  const order = await store.showProduct(Number(req.params.id))
  res.json(order)
}

const update = async (req : Request, res : Response) => {
  try {
    const product : addedProduct = {
      quantity: req.body.quantity,
      order_id: req.body.order_id,
      product_id: req.body.product_id

    }
    const newOrder = await store.updateProduct(Number(req.params.id), product)
    res.json(newOrder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.deleteProduct(Number(req.params.id))
  res.json(deleted)
}

const addProducts = async (req : Request, res : Response) => {
  const product : addedProduct = {
    quantity: req.body.quantity,
    order_id: req.body.order_id,
    product_id: req.body.product_id

  }
  try {
    const products = await store.addProduct(Number(product.quantity), Number(product.order_id), Number(product.product_id))
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const orderProductsRoutes = (app: express.Application) => {
  app.get('/orders/products', logger, index)
  app.get('/orders/:id/products', [logger, verifyAuthToken], show)
  app.put('/orders/:id/products', [logger, verifyAuthToken], update)
  app.delete('/orders/:id/products', [logger, verifyAuthToken], destroy)
  app.post('/orders/:id/products', [logger, verifyAuthToken], addProducts)
}

export default orderProductsRoutes

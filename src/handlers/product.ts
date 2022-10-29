/* eslint-disable new-cap */
import express, { NextFunction, Request, Response } from 'express'
import { product, productsStore } from '../models/products'
import logger from '../utilities/logger'
import jwt from 'jsonwebtoken'
const store = new productsStore()
// @ts-ignore
const verifyAuthToken = (req: Request, res: Response, next :NextFunction) => {
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

const index = async (_req: Request, res: Response) => {
  try {
    const product = await store.index()
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(Number(req.params.id))
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product: product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    }
    const newProduct = await store.create(product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req : Request, res : Response) => {
  try {
    const product: product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    }
    const newProduct = await store.update(Number(req.params.id), product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(Number(req.params.id))
    res.json(deleted)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', [logger, verifyAuthToken], index)
  app.get('/products/:id', [logger, verifyAuthToken], show)
  app.post('/products', [logger, verifyAuthToken], create)
  app.put('/products/:id', [logger, verifyAuthToken], update)
  app.delete('/products/:id', [logger, verifyAuthToken], destroy)
}

export default productRoutes

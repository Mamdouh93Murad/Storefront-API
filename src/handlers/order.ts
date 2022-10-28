/* eslint-disable new-cap */
import express, { NextFunction, Request, Response } from 'express'
import { order, ordersStore } from '../models/orders'
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

const store = new ordersStore()

const index = async (_req: Request, res: Response) => {
  const order = await store.index()
  res.json(order)
}

const show = async (req: Request, res: Response) => {
  const order = await store.show(Number(req.params.id))
  res.json(order)
}

const create = async (req: Request, res: Response) => {
  try {
    const order : order = {
      id: req.body.id,
      status: req.body.status,
      user_id: req.body.user_id
    }
    const newOrder = await store.create(order)
    res.json(newOrder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req : Request, res : Response) => {
  try {
    const order : order = {
      status: req.body.status,
      user_id: req.body.user_id
    }
    const newOrder = await store.update(Number(req.params.id), order)
    res.json(newOrder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(Number(req.params.id))
  res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', logger, index)
  app.get('/orders/:id', logger, show)
  app.post('/orders', [logger, verifyAuthToken], create)
  app.put('/orders/:id', [logger, verifyAuthToken], update)
  app.delete('/orders/:id', [logger, verifyAuthToken], destroy)
}

export default orderRoutes

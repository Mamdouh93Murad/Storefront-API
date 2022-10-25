/* eslint-disable new-cap */
import express, { NextFunction, Request, Response } from 'express'
import { category, categoryStore } from '../models/categories'
import logger from '../utilities/logger'
import jwt from 'jsonwebtoken'
const store = new categoryStore()
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
  const category = await store.index()
  res.json(category)
}

const show = async (req: Request, res: Response) => {
  const category = await store.show(Number(req.params.id))
  res.json(category)
}

const create = async (req: Request, res: Response) => {
  try {
    const category: category = {
      name: req.body.name
    }
    const newCategory = await store.create(category)
    res.json(newCategory)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req : Request, res : Response) => {
  try {
    const category : category = {
      name: req.body.name
    }
    const newCategory = await store.update(Number(req.params.id), category)
    res.json(newCategory)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(Number(req.params.id))

  res.json(deleted)
}

const categoryRoutes = (app: express.Application) => {
  app.get('/categories', logger, index)
  app.get('/categories/:id', logger, show)
  app.post('/categories', [logger, verifyAuthToken], create)
  app.put('/categories/:id', [logger, verifyAuthToken], update)
  app.delete('/categories/:id', [logger, verifyAuthToken], destroy)
}

export default categoryRoutes

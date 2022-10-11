/* eslint-disable new-cap */
import express, { Request, Response } from 'express'
import { category, categoryStore } from '../models/categories'
import logger from '../utilities/logger'
const store = new categoryStore()

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
  app.post('/categories', logger, create)
  app.put('/categories/:id', logger, update)
  app.delete('/categories/:id', logger, destroy)
}

export default categoryRoutes

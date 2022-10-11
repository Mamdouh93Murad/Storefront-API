/* eslint-disable new-cap */
import express, { Request, Response } from 'express'
import { region, regionsStore } from '../models/regions'
import logger from '../utilities/logger'
const store = new regionsStore()

const index = async (_req: Request, res: Response) => {
  const region = await store.index()
  res.json(region)
}

const show = async (req: Request, res: Response) => {
  const region = await store.show(Number(req.params.id))
  res.json(region)
}

const create = async (req: Request, res: Response) => {
  try {
    const region: region = {
      name: req.body.name
    }
    const newRegion = await store.create(region)
    res.json(newRegion)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req : Request, res : Response) => {
  try {
    const region: region = {
      name: req.body.name
    }
    const newRegion = await store.update(Number(req.params.id), region)
    res.json(newRegion)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(Number(req.params.id))
  res.json(deleted)
}

const regionRoutes = (app: express.Application) => {
  app.get('/regions', logger, index)
  app.get('/regions/:id', logger, show)
  app.post('/regions', logger, create)
  app.put('/regions/:id', logger, update)
  app.delete('/regions/:id', logger, destroy)
}

export default regionRoutes

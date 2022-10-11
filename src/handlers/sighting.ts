/* eslint-disable new-cap */
import express, { Request, Response } from 'express'
import { sighting, sightingsStore } from '../models/sightings'
import logger from '../utilities/logger'
const store = new sightingsStore()

const index = async (_req: Request, res: Response) => {
  const sighting = await store.index()
  res.json(sighting)
}

const show = async (req: Request, res: Response) => {
  const category = await store.show(Number(req.params.id))
  res.json(category)
}

const create = async (req: Request, res: Response) => {
  try {
    const sighting : sighting = {
      name: req.body.name,
      description: req.body.description,
      number: req.body.number
    }
    const newSighting = await store.create(sighting, req.params.user, req.params.region, req.params.category)
    res.json(newSighting)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req : Request, res : Response) => {
  try {
    const sighting : sighting = {
      name: req.body.name,
      description: req.body.description,
      number: req.body.number
    }
    const newSighting = await store.update(Number(req.params.id), sighting)
    res.json(newSighting)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(Number(req.params.id))
  res.json(deleted)
}

const sightingRoutes = (app: express.Application) => {
  app.get('/sightings', logger, index)
  app.get('/sightings/:id', logger, show)
  app.post('/sightings', logger, create)
  app.put('/sightings/:id', logger, update)
  app.delete('/sightings/:id', logger, destroy)
}

export default sightingRoutes

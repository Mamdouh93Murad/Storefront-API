/* eslint-disable new-cap */
import express, { NextFunction, Request, Response } from 'express'
import { region, regionsStore } from '../models/regions'
import logger from '../utilities/logger'
import jwt from 'jsonwebtoken'
const store = new regionsStore()
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
  app.post('/regions', [logger, verifyAuthToken], create)
  app.put('/regions/:id', [logger, verifyAuthToken], update)
  app.delete('/regions/:id', [logger, verifyAuthToken], destroy)
}

export default regionRoutes

/* eslint-disable new-cap */
import express, { Request, Response } from 'express'
import { user, usersStore } from '../models/users'
import logger from '../utilities/logger'
const store = new usersStore()

const index = async (_req: Request, res: Response) => {
  const user = await store.index()
  res.json(user)
}

const show = async (req: Request, res: Response) => {
  const user = await store.show(Number(req.params.id))
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  try {
    const user: user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const newUser = await store.create(user)
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req : Request, res : Response) => {
  try {
    const user: user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const newUser = await store.update(Number(req.params.id), user)
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(Number(req.params.id))
  res.json(deleted)
}

const authenticate = async (req : Request, res : Response) => {
  try {
    const user : user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const newUser = await store.authenticate(req.params.name, user.password)
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', logger, index)
  app.get('/users/:id', logger, show)
  app.post('/users', logger, create)
  app.put('/users/:id', logger, update)
  app.delete('/users/:id', logger, destroy)
  app.post('/users/authenticate/:name', logger, authenticate)
}

export default userRoutes

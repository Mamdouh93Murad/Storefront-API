/* eslint-disable new-cap */
import express, { NextFunction, Request, Response } from 'express'
import { user, usersStore } from '../models/users'
import logger from '../utilities/logger'
import jwt, { JwtPayload } from 'jsonwebtoken'
const store = new usersStore()

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
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
    const newUser = await store.create(user)
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req : Request, res : Response) => {
  try {
    const user: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
    try {
      const authorizationHeader = req.headers.authorization as string
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload
      if (decoded.id !== user.id) {
        throw new Error('User id does not match!')
      }
    } catch (err) {
      res.status(401)
      res.json(err)
      return
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
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }

    const newUser = await store.authenticate(req.params.firstname, user.password)
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string)
    res.json(token)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', [logger, verifyAuthToken], index)
  app.get('/users/:id', [logger, verifyAuthToken], show)
  app.post('/users', logger, create)
  app.put('/users/:id', [logger], update)
  app.delete('/users/:id', [logger, verifyAuthToken], destroy)
  app.post('/users/authenticate/:name', [logger, verifyAuthToken], authenticate)
}

export default userRoutes

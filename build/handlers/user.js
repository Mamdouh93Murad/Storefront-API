"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const logger_1 = __importDefault(require("../utilities/logger"));
const store = new users_1.usersStore();
const index = async (_req, res) => {
    const user = await store.index();
    res.json(user);
};
const show = async (req, res) => {
    const user = await store.show(Number(req.params.id));
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email
        };
        const newUser = await store.create(user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email
        };
        const newUser = await store.update(Number(req.params.id), user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(Number(req.params.id));
    res.json(deleted);
};
const userRoutes = (app) => {
    app.get('/users', logger_1.default, index);
    app.get('/users/:id', logger_1.default, show);
    app.post('/users', logger_1.default, create);
    app.put('/users/:id', logger_1.default, update);
    app.delete('/users/:id', logger_1.default, destroy);
};
exports.default = userRoutes;

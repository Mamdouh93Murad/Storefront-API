"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const logger_1 = __importDefault(require("../utilities/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// @ts-ignore
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        // eslint-disable-next-line no-unused-vars
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
const store = new orders_1.ordersStore();
const index = async (_req, res) => {
    const order = await store.index();
    res.json(order);
};
const show = async (req, res) => {
    const order = await store.show(Number(req.params.id));
    res.json(order);
};
const create = async (req, res) => {
    try {
        const order = {
            id: req.body.id,
            status: req.body.status,
            user_id: req.body.user_id
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const order = {
            status: req.body.status,
            user_id: req.body.user_id
        };
        const newOrder = await store.update(Number(req.params.id), order);
        res.json(newOrder);
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
const orderRoutes = (app) => {
    app.get('/orders', logger_1.default, index);
    app.get('/orders/:id', logger_1.default, show);
    app.post('/orders', [logger_1.default, verifyAuthToken], create);
    app.put('/orders/:id', [logger_1.default, verifyAuthToken], update);
    app.delete('/orders/:id', [logger_1.default, verifyAuthToken], destroy);
};
exports.default = orderRoutes;

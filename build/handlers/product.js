"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const logger_1 = __importDefault(require("../utilities/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new products_1.productsStore();
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
const index = async (_req, res) => {
    try {
        const product = await store.index();
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(Number(req.params.id));
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const newProduct = await store.update(Number(req.params.id), product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(Number(req.params.id));
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', [logger_1.default], index);
    app.get('/products/:id', [logger_1.default], show);
    app.post('/products', [logger_1.default, verifyAuthToken], create);
    app.put('/products/:id', [logger_1.default, verifyAuthToken], update);
    app.delete('/products/:id', [logger_1.default, verifyAuthToken], destroy);
};
exports.default = productRoutes;

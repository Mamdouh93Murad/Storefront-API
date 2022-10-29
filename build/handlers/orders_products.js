"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_products_1 = require("../models/orders_products");
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
const store = new orders_products_1.ordersProductsStore();
const index = async (_req, res) => {
    try {
        const order = await store.index();
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.showProduct(Number(req.params.id));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const product = {
            quantity: req.body.quantity,
            order_id: req.body.order_id,
            product_id: req.body.product_id
        };
        const newOrder = await store.updateProduct(Number(req.params.id), product);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.deleteProduct(Number(req.params.id));
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProducts = async (req, res) => {
    try {
        const product = {
            quantity: req.body.quantity,
            order_id: req.body.order_id,
            product_id: req.body.product_id
        };
        const products = await store.addProduct(Number(product.quantity), Number(product.order_id), Number(product.product_id));
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderProductsRoutes = (app) => {
    app.get('/orders/products', [logger_1.default, verifyAuthToken], index);
    app.get('/orders/:id/products', [logger_1.default, verifyAuthToken], show);
    app.put('/orders/:id/products', [logger_1.default, verifyAuthToken], update);
    app.delete('/orders/:id/products', [logger_1.default, verifyAuthToken], destroy);
    app.post('/orders/:id/products', [logger_1.default, verifyAuthToken], addProducts);
};
exports.default = orderProductsRoutes;

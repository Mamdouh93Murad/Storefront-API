"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("../models/categories");
const logger_1 = __importDefault(require("../utilities/logger"));
const store = new categories_1.categoryStore();
const index = async (_req, res) => {
    const category = await store.index();
    res.json(category);
};
const show = async (req, res) => {
    const category = await store.show(Number(req.params.id));
    res.json(category);
};
const create = async (req, res) => {
    try {
        const category = {
            name: req.body.name
        };
        const newCategory = await store.create(category);
        res.json(newCategory);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const category = {
            name: req.body.name
        };
        const newCategory = await store.update(Number(req.params.id), category);
        res.json(newCategory);
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
const categoryRoutes = (app) => {
    app.get('/categories', logger_1.default, index);
    app.get('/categories/:id', logger_1.default, show);
    app.post('/categories', logger_1.default, create);
    app.put('/categories/:id', logger_1.default, update);
    app.delete('/categories/:id', logger_1.default, destroy);
};
exports.default = categoryRoutes;

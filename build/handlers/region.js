"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const regions_1 = require("../models/regions");
const logger_1 = __importDefault(require("../utilities/logger"));
const store = new regions_1.regionsStore();
const index = async (_req, res) => {
    const region = await store.index();
    res.json(region);
};
const show = async (req, res) => {
    const region = await store.show(Number(req.params.id));
    res.json(region);
};
const create = async (req, res) => {
    try {
        const region = {
            name: req.body.name
        };
        const newRegion = await store.create(region);
        res.json(newRegion);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const region = {
            name: req.body.name
        };
        const newRegion = await store.update(Number(req.params.id), region);
        res.json(newRegion);
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
const regionRoutes = (app) => {
    app.get('/regions', logger_1.default, index);
    app.get('/regions/:id', logger_1.default, show);
    app.post('/regions', logger_1.default, create);
    app.put('/regions/:id', logger_1.default, update);
    app.delete('/regions/:id', logger_1.default, destroy);
};
exports.default = regionRoutes;

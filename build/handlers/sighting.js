"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sightings_1 = require("../models/sightings");
const logger_1 = __importDefault(require("../utilities/logger"));
const store = new sightings_1.sightingsStore();
const index = async (_req, res) => {
    const sighting = await store.index();
    res.json(sighting);
};
const show = async (req, res) => {
    const category = await store.show(Number(req.params.id));
    res.json(category);
};
const create = async (req, res) => {
    try {
        const sighting = {
            name: req.body.name,
            description: req.body.description,
            number: req.body.number
        };
        const newSighting = await store.create(sighting, req.params.user, req.params.region, req.params.category);
        res.json(newSighting);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const sighting = {
            name: req.body.name,
            description: req.body.description,
            number: req.body.number
        };
        const newSighting = await store.update(Number(req.params.id), sighting);
        res.json(newSighting);
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
const sightingRoutes = (app) => {
    app.get('/sightings', logger_1.default, index);
    app.get('/sightings/:id', logger_1.default, show);
    app.post('/sightings', logger_1.default, create);
    app.put('/sightings/:id', logger_1.default, update);
    app.delete('/sightings/:id', logger_1.default, destroy);
};
exports.default = sightingRoutes;

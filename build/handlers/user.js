"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const logger_1 = __importDefault(require("../utilities/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new users_1.usersStore();
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
        const user = await store.index();
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(Number(req.params.id));
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        try {
            const authorizationHeader = req.headers.authorization;
            const token = authorizationHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            if (decoded.id !== user.id) {
                throw new Error('User id does not match!');
            }
        }
        catch (err) {
            res.status(401);
            res.json(err);
            return;
        }
        const newUser = await store.update(Number(req.params.id), user);
        res.json(newUser);
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
const authenticate = async (req, res) => {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const newUser = await store.authenticate(req.params.firstname, user.password);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/users', [logger_1.default, verifyAuthToken], index);
    app.get('/users/:id', [logger_1.default, verifyAuthToken], show);
    app.post('/users', logger_1.default, create);
    app.put('/users/:id', [logger_1.default, verifyAuthToken], update);
    app.delete('/users/:id', [logger_1.default, verifyAuthToken], destroy);
    app.post('/users/authenticate/:name', [logger_1.default, verifyAuthToken], authenticate);
};
exports.default = userRoutes;

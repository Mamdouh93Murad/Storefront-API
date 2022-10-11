"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const category_1 = __importDefault(require("./handlers/category"));
const user_1 = __importDefault(require("./handlers/user"));
const region_1 = __importDefault(require("./handlers/region"));
const sighting_1 = __importDefault(require("./handlers/sighting"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const corsOptions = {
    // origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('MEOW!');
});
(0, category_1.default)(app);
(0, region_1.default)(app);
(0, user_1.default)(app);
(0, sighting_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("../swagger-output.json"));
const cors = require("cors");
const app = (0, express_1.default)();
//app.use("/static", express.static(__dirname +'/frontend/static'));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
// conectando com banco
mongoose_1.default.connect('mongodb+srv://marcus:marcus123@cluster0.wyjjj.mongodb.net/?retryWrites=true&w=majority');
app.get('/', (req, res) => {
    res.send('Pixel API is working.');
});
//parar poder receber arquivos json
app.use(express_1.default.json());
//habilitando cors
app.use(cors());
//swagger config
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
//centralizando todas as rotas
app.use("/api", routes_1.default);
//custom error
app.use(errorHandler_middleware_1.default);
exports.default = app;

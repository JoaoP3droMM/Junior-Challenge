"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const Anel_1 = require("./entities/Anel");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    migrations: ["src/migrations/*.ts"],
    logging: true,
    entities: [Anel_1.Anel],
});
exports.AppDataSource.initialize()
    .then(() => console.log('✅ Banco de dados conectado!'))
    .catch((err) => console.error('⛔ Erro ao conectar no banco: ', err));

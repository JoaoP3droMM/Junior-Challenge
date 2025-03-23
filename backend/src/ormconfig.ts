import { DataSource } from "typeorm"
import dotenv from "dotenv"
import "reflect-metadata"
import { Anel } from "./entities/Anel";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Anel],
})

AppDataSource.initialize()
  .then(() => console.log('✅ Banco de dados conectado!'))
  .catch((err) => console.error('⛔ Erro ao conectar no banco: ', err))
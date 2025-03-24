import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './ormconfig'
import anelRoutes from './routes/AnelRoutes'

const app = express()

// Configurando CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Adicione isso antes das rotas
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next();
})

app.use(express.json())

app.use('/api', anelRoutes)

AppDataSource.initialize()
    .then(() => {
        console.log('🔌 Banco de dados conectado!')
        app.listen(3000, () => console.log('🎢 Servidor rodando na porta 3000'))
    })
    .catch((error) => console.log(error))
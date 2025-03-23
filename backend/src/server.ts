import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './ormconfig'
import anelRoutes from './routes/AnelRoutes'

const app = express()
app.use(express.json())

app.use('/api', anelRoutes)

AppDataSource.initialize()
    .then(() => {
        console.log('🔌 Banco de dados conectado!')
        app.listen(3000, () => console.log('🎢 Servidor rodando na porta 3000'))
    })
    .catch((error) => console.log(error))
import express, { Application } from 'express'
import { config as initializerConfig } from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

import auth from './routes/auth.route'
import meals from './routes/meals.route'
import orders from './routes/orders.route'

initializerConfig()

const app: Application = express()
// connection database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true } as any)

//middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(cors())

// routes
app.use('/api/auth', auth)
app.use('/api/meals', meals)
app.use('/api/orders', orders)


export default app
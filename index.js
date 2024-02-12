import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import feedbacksRouter from './routes/feedbacks.js'
import tutorialsRouter from './routes/tutorials.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
	cors({
		origin: process.env.ORIGIN ? process.env.ORIGIN : '*'
	})
)

app.use('/feedbacks', feedbacksRouter)
app.use('/tutorials', tutorialsRouter)

const PORT = process.env.PORT || 3001

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
	)
	.catch(console.error)

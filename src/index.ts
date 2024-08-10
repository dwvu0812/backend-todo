import express, { Express, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import todoRoutes from './routes/todoRoutes'
import { errorHandler } from './middleware/errorHandler'

const app: Express = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/todos', todoRoutes)

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('Todo API is running')
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send('404 - Not Found')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app

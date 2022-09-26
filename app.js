import express, { json } from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import listsRoutes from './routes/lists.routes'
import database from './database'

const app = express()
const port = process.env.PORT

app.use(json())
app.use(morgan('dev'))
app.use(listsRoutes)
app.listen(port, () => {
    console.log(`listening on PORT: ${port}`)
})
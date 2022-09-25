import express, { json } from 'express'
import morgan  from 'morgan'
import 'dotenv/config'

const app = express()

app.use(json())
app.use(morgan('dev'))

const port = process.env.PORT 

let lists = [
    {
        name: 'Top Songs of the year',
        description: 'The most listened songs of 2022'
    }
]

let songs = []

app.get('/lists', (req, res) => {
    res.send(lists)
})




app.listen(port)
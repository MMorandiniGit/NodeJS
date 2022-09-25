import express, { json } from 'express'
import morgan from 'morgan'
import 'dotenv/config'

const app = express()

app.use(json())
app.use(morgan('dev'))

const port = process.env.PORT

let lists = [
    {
        name: 'Pop',
        description: 'The best pop music in the world',
        songs: [
            {
                title: 'late at night',
                artist: 'Roddy Ricch',
                albumName: 'LIVE LIFE FAST',
                year: '2022'
            },
            {
                title: 'BUTTERFLY EFFECT',
                artist: 'Travis Scott',
                albumName: 'ASTROWORLD',
                year: '2022'
            }
        ]
    }
]

app.get('/lists', (req, res) => {
    res.send(lists)
})

app.post('/lists', (req, res) => {
    lists.push(req.body)
    res.send(res.body)
})




app.listen(port)
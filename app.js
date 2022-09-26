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
    },
    {
        name: 'Rock',
        description: 'The best rock music in the world',
        songs: [
            {
                title: 'Shoot in the dark',
                artist: 'AC/DC',
                albumName: 'Power Up',
                year: '2000'
            },
            {
                title: 'Retrograde',
                artist: 'Pearl Jam',
                albumName: 'Gigaton',
                year: '1998'
            }
        ]
    },

]

app.get('/lists', (req, res) => {
    res.send(lists)
})

app.get('/lists/:name', function (req, res) {
    let name = req.params.name
    let list = lists.find(x => x.name == name)
    if (list == null) {
        res.status(404).send("404 Not Found")
        return
    }

    res.send(list)
})

app.post('/lists', (req, res) => {
    let name = req.body.name
    let description = req.body.description
    let songs = req.body.songs
    if (name == null || name == '') {
        res.status(400).send("400 Bad Request")
        return
    }

    lists.push({ name: name, description: description, songs: songs })
    res.status(201).send(lists)
})

app.put('/lists/:name', (req, res) => {
    let name = req.params.name
    let list = lists.find(x => x.name == name)
    list.list = req.body.list
    list.description = req.body.description
    res.send(list)
})

app.listen(port)
import express from 'express'
import lists from '../models/lists.model'

const router = express.Router()

router.get('/lists', async (req, res) => {
    try {
        const list = await list.find()
        res.send(lists)
    } catch (err) {
        res.status(500).send(err)
    }
    
})

router.get('/lists/:name', async (req, res) => {
    let name = req.params.name
    let list = lists.find(x => x.name == name)
    if (list == null) {
        res.status(404).send("404 Not Found")
        return
    }

    res.send(list)
})

router.get('/lists/:name/songs', async (req, res) => {
    let lname = req.params.name
    let list = await lists.findOne({name: lname})
    res.send(list.songs)
})

router.get('/lists/:name/songs/:title', (req, res) => {
    let name = req.params.name
    let title = req.params.title
    let list = lists.find(x => x.name == name)
    let song = list.songs.find(x => x.title == title)
    if (song == null || name == null) {
        res.status(404).send("404 Not Found")
    } 
    res.send(song)
})

router.post('/lists', (req, res) => {
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

router.post('/lists/:name/songs', (req, res) => {
    let name = req.params.name
    let songs = req.body.songs
    let title = req.body.title
    let artist = req.body.artist
    let albumName = req.body.albumName
    let year = req.body.year
    let list = lists.find(x => x.name == name)
    if (list == null) {
        res.status(404).send("404 Not Found")
        return
    }

    list.songs.push({ title: title, artist: artist, albumName: albumName, year: year })
    res.status(201).send(songs)
})

router.put('/lists/:name', (req, res) => {
    let name = req.params.name
    let lname = req.body.name
    let list = lists.find(x => x.name == name)
    if (list == null) {
        res.status(404).send("404 Not Found")
        return
    }
    if (lname != list.name) {
        res.status(409).send("409 Conflict")
        return
    }    
    else
    res.status(204).send(list)     
})

router.put('/lists/:name/songs/:title', (req, res) => {
    let name = req.params.name
    let title = req.params.title
    let list = lists.find(x => x.name == name)
    if (list == null) {
        res.status(404).send("404 Not Found")
        return
    }
    let song = list.songs.find(x => x.title == title)
    if (song == null) {
        res.status(404).send("404 Not Found")
    }

    song.title = req.body.title
    song.artist = req.body.artist
    song.albumName = req.body.albumName
    song.year = req.body.year
    res.send(song)
})

router.delete('/lists/:name', (req, res) => {
    let name = req.params.name
    let listToDelete = lists.filter(x => x.name == name).at(0)
    if (listToDelete == null)
        res.status(404).send("404 Not Found")
        
    let index = lists.indexOf(listToDelete)
    lists.splice(index, 1)
    res.status(204).send("Se elimino la PlayList")
})

router.delete('/lists/:name/songs/:title', (req, res) => {
    let name = req.params.name
    let title = req.params.title
    let list = lists.find(x => x.name == name)
    if (list == null) {
        res.status(404).send("404 Not Found")
        return
    }
    let song = list.songs.filter(x => x.title == title).at(0)
    if (song == null) {
        res.status(404).send("404 Not Found")
    }
    let index = list.songs.indexOf(song)
    list.songs.splice(index, 1)
    res.status(204).send("Se elimino la cancion")
})

export default router
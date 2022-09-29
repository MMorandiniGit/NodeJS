import mongoose from "mongoose"

const songSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        albumName: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
})

const song = mongoose.model('song', songSchema)

export default songSchema
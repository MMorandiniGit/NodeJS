import mongoose from 'mongoose'

const listsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        required: false
        ({
            type: String,
            required: true
        }
        )
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

const lists = mongoose.model('lists', listsSchema)

export default lists
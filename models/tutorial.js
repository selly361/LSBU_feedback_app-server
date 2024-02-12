import { Schema, model } from 'mongoose'

const tutorialSchema = Schema({
	name: {
		type: String,
		required: true,
	},

    lesson: {
        type: String,
        required: true
    }
})

const Tutorial = model('Tutorial', tutorialSchema)

export default Tutorial

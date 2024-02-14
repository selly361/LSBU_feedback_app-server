import { Schema, model } from 'mongoose'

const replySchema = Schema({
	username: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	replyingTo: {
		type: String,
		required: true
	}
})

const feedbackSchema = Schema(
	{
		title: {
			type: String,
			required: true
		},
		detail: {
			type: String,
			default: ''
		},
		tutorial: {
			type: Schema.Types.ObjectId,
			ref: 'Tutorial'
		},
		likes: {
			count: {
				type: Number,
				default: 0
			},
			users: [String]
		},
		dislikes: {
			count: {
				type: Number,
				default: 0
			},
			users: [String]
		},
		comments: [
			{
				username: {
					type: String,
					required: true
				},
				text: {
					type: String,
					required: true
				},
				replies: [replySchema]
			}
		],
		netLikes: {
			type: Number,
			default: function () {
				return this.likes.count - this.dislikes.count
			}
		}
	},
	{ timestamps: true }
)

const Feedback = model('Feedback', feedbackSchema)

export default Feedback

import Feedback from '../models/feedback.js'


const getAllFeedbacks = async (req, res) => {
	try {
		const feedbacks = await Feedback.find()
		res.status(200).json(feedbacks)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}


const getFeedback = async (req, res) => {
	const { id } = req.params

	try {
		const feedback = await Feedback.findById(id)
		res.status(200).json(feedback)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}


const likeFeedback = async (req, res) => {
	const { id } = req.params
	const { username } = req.body

	try {
		const feedback = await Feedback.findById(id)

		if (
			!feedback.likes.users.includes(username) &&
			!feedback.dislikes.users.includes(username)
		) {
			feedback.likes.count += 1
			feedback.likes.users.push(username)

			const dislikeIndex = feedback.dislikes.users.indexOf(username)
			if (dislikeIndex !== -1) {
				feedback.dislikes.count -= 1
				feedback.dislikes.users.splice(dislikeIndex, 1)
			}

			const updatedFeedback = await feedback.save()
			res.status(200).json(updatedFeedback)
		} else if (feedback.dislikes.users.includes(username)) {
			feedback.likes.count += 1
			feedback.likes.users.push(username)

			const dislikeIndex = feedback.dislikes.users.indexOf(username)
			feedback.dislikes.count -= 1
			feedback.dislikes.users.splice(dislikeIndex, 1)

			const updatedFeedback = await feedback.save()
			res.status(200).json(updatedFeedback)
		} else {
			res.status(400).json({ message: 'User has already liked this feedback.' })
		}
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

const dislikeFeedback = async (req, res) => {
	const { id } = req.params
	const { username } = req.body

	try {
		const feedback = await Feedback.findById(id)

		if (
			!feedback.likes.users.includes(username) &&
			!feedback.dislikes.users.includes(username)
		) {
			feedback.dislikes.count += 1
			feedback.dislikes.users.push(username)

			const likeIndex = feedback.likes.users.indexOf(username)
			if (likeIndex !== -1) {
				feedback.likes.count -= 1
				feedback.likes.users.splice(likeIndex, 1)
			}

			const updatedFeedback = await feedback.save()
			res.status(200).json(updatedFeedback)
		} else if (feedback.likes.users.includes(username)) {
			feedback.dislikes.count += 1
			feedback.dislikes.users.push(username)

			const likeIndex = feedback.likes.users.indexOf(username)
			feedback.likes.count -= 1
			feedback.likes.users.splice(likeIndex, 1)

			const updatedFeedback = await feedback.save()
			res.status(200).json(updatedFeedback)
		} else {
			res
				.status(400)
				.json({ message: 'User has already disliked this feedback.' })
		}
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

const addFeedback = async (req, res) => {
	const { title, detail, tutorialId } = req.body

	try {
		const newFeedback = new Feedback({
			title,
			detail,
			tutorial: tutorialId,
			likes: {
				count: 0,
				users: []
			},
			dislikes: {
				count: 0,
				users: []
			},
			comments: []
		})

		const savedFeedback = await newFeedback.save()
		res.status(201).json(savedFeedback)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

const addComment = async (req, res) => {
	const { id } = req.params
	const { username, text } = req.body

	try {
		const feedback = await Feedback.findById(id)
		const newComment = { username, text, replies: [] }
		feedback.comments.push(newComment)

		const updatedFeedback = await feedback.save()
		res.status(200).json(updatedFeedback)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

const addReply = async (req, res) => {
	const { id, commentId } = req.params
	const { username, text, replyingTo } = req.body

	try {
		const feedback = await Feedback.findById(id)
		const comment = feedback.comments.find(
			(c) => c._id.toString() === commentId
		)

		if (!comment) {
			res.status(404).json({ message: 'Comment not found' })
			return
		}

		const newReply = { username, text, replyingTo }
		comment.replies.push(newReply)

		const updatedFeedback = await feedback.save()
		res.status(200).json(updatedFeedback)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export { getAllFeedbacks, likeFeedback, dislikeFeedback, addFeedback, addComment, addReply, getFeedback }

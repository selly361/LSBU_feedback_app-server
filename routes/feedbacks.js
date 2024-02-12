import express from 'express'
import * as controllers from '../controllers/feedbackControllers.js'

const router = express.Router()

router.get('/', controllers.getAllFeedbacks)
router.get('/:id', controllers.getFeedback)
router.post('/', controllers.addFeedback)
router.put('/:id/like', controllers.likeFeedback)
router.put('/:id/dislike', controllers.dislikeFeedback)
router.post('/:id/comment', controllers.addComment)
router.post('/:id/comment/:commentId/reply', controllers.addReply)

export default router

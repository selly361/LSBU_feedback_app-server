import Tutorial from '../models/tutorial.js'

const getAllTutorials = async (req, res) => {
	try {
		const tutorials = await Tutorial.find()
		res.status(200).json(tutorials)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export { getAllTutorials }
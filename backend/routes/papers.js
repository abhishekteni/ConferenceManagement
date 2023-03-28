const express = require('express')
const {
  createPaper,
  getPapers,
  getPaper,
  deletePaper,
  updatePaper,
  getallUser
} = require('../controllers/paperController')

const requireAuth =require('../middleware/requireAuth')
const router = express.Router()
// require auth for all paper routes
router.use(requireAuth)
// GET all papers
router.get('/', getPapers)


// Fetch all user
router.get('/admin123', getallUser)

//GET a single paper
router.get('/:id', getPaper)



// POST a new paper
router.post('/', createPaper)

// DELETE a paper
router.delete('/:id', deletePaper)

// UPDATE a paper
router.put('/:id', updatePaper)



module.exports = router
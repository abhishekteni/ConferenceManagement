const express = require('express')


const {
  createPaper,
  getPapers,
  getPaper,
  deletePaper,
  updatePaper,
  updateallPaper,
  getallUser,
  updateUser,
  getallPapers
} = require('../controllers/paperController')

const requireAuth =require('../middleware/requireAuth')
// const uploadPdfMiddleware = require('../middleware/upload')
// const upload = require('../middleware/upload')



const router = express.Router()
// require auth for all paper routes
router.use(requireAuth)
// GET papers with pagination
router.get('/', getPapers)

// GET papers without pagination
router.get('/all', getallPapers)

// Fetch all user
router.get('/admin123', getallUser)

// Update a user
router.put('/admin123/:id', updateUser)

//GET a single paper
router.get('/:id', getPaper)



// POST a new paper
router.post('/',createPaper)

// DELETE a paper
router.delete('/:id', deletePaper)

// UPDATE a paper
router.put('/:id', updatePaper)

// UPDATE all paper
router.put('/', updateallPaper)

module.exports = router
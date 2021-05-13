import {Router} from 'express'
import {getArticle, getPublications, getAuthors} from '../controllers/servers.js'
const router = Router();

router.get('/article/id=:id', getArticle)
router.get('/publications', getPublications)
router.get('/authors', getAuthors)

export default router
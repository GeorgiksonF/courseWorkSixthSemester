import {Router} from 'express'
import {getArticle, getPublications} from '../controllers/servers.js'
const router = Router();

router.get('/article/id=:id', getArticle)
router.get('/publications', getPublications)

export default router
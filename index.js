import express from 'express'
import path from 'path'
import serverRoutes from './routes/servers.js'

const __dirname = path.resolve()
const PORT = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(serverRoutes)

app.get('/', (req, res) => {
  res.render('index', {title: 'Main Page', active: 'main'})
})


app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})
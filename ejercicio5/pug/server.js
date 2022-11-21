const express = require('express')
const{ Router } = express;

const app = express()
const PORT = 8080
const RUTA = '/productos'
const router = new Router();

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(` server listening on PORT: ${PORT}`)
})

server.on('error', err => console.log(err))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/', router)

app.set('views', './views')
app.set('view engine', 'pug')

const products = [];
let productExist = false;

router.get(RUTA, (req, res) => {
    if(products.length > 0){
        productExist = true
    }
    res.render('get', {
        products,
        productExist
    })
})

router.post('/', (req, res) => {
        const producto = req.body
        products.push(producto)
})

router.get('/', (req, res) => {
    res.render('post')
})


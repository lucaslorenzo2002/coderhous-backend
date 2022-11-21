const { json } = require('express');
const express = require('express');
const exphbs = require('express-handlebars');
const{ Router } = express;


const app = express();
const PORT = 8080;
const router = new Router();
const RUTA = '/productos'

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(` server listening on PORT: ${PORT}`)
})

server.on('error', err => console.log(err))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/', router)


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const products = []
let productsExist = false



router.get(RUTA, (req, res) => {
    if(products.length > 0){
        productsExist = true
    }
    res.render('get', {
        title: 'productos',
        productsExist,
        products
    })
})

router.post('/',(req, res) => {
    const producto = req.body
    products.push(producto)
    res.redirect(RUTA)
})

router.get('/', (req, res) => {
    res.render('post')
})
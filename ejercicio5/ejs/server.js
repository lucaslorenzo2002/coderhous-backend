const express = require('express');
const{ Router } = express;

const app = express();
const PORT = 3000;
const RUTA = '/productos';
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
app.set('view engine', 'ejs')

const products = [];
let productExist = false

router.get('/productos', (req, res) => {
    if(products.length > 0){
        productExist = true
    }
    res.render('get', {
        products,
        productExist
    })
})

router.get('/', (req, res) => {
    res.render('post')
}) 

router.post('/', (req, res) => {
    const product = req.body
    products.push(product)
})
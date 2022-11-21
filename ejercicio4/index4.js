const express = require('express');
const{ Router } = express;

const app = express();
const PORT = 6000;
const RUTA = '/productos';
const RUTAID = '/productos/:id';
const router = new Router();


const server = app.listen(process.env.PORT || PORT, () => {
    console.log(` server listening on PORT: ${PORT}`)
})

server.on('error', err => console.log(err))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.use('/api', router)

function productNotFound (req, res, next){
    if(parseInt(req.params.id) > products.length || parseInt(req.params.id) <= 0){
        res.status(404).json({error: 'product not found'})
    } else{
        next()
    }
}

let products = [];

router.get(RUTA, (req,res) => {
    res.json(products)
})

router.get(RUTAID, productNotFound,(req,res) => {
    let id = parseInt(req.params.id);
    let productFound = products.find(p => p.id === id);
    res.json(productFound)
})

router.post(RUTA, (req,res) => {
    let newId = products.length + 1;
    let obj = {id: newId, ...req.body};
    products.push(obj)
    res.json({estado: 'enviado'})
})

router.put(RUTAID, productNotFound, (req,res) => {
    let newData = req.body;
    products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p);   
    res.json({estado: 'producto actualizado con exito'})
})

router.delete(RUTAID, productNotFound, (req,res) => {
    let id = parseInt(req.params.id);
    let productDeleted = products.filter(p => p.id !== id)
    res.json(productDeleted)
})
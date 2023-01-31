process.on('exit', () => {
    console.log('hilo terminado: ' + process.pid);
})

process.on('message', msj => {
    console.log('hilo iniciado: ' + process.pid);

    const length = parseInt(msj)

const randoms = () => {
    return parseInt(Math.random() * 1000) + 1
}

    let obj = {}

    for (let i = 0; i < length; i++) {
        
        const numero = randoms()
        if(!obj[numero]){
            obj[numero] = 0
        }
            obj[numero]++
    }

    process.send(obj)
    process.exit()
})

process.send('proceso terminado')
import express from 'express'
import { ProductManager } from './productManager.js'

const app = express()

server.use(express.json());


app.get("/products", async (req, resp) => {
    try{
    const pm = new ProductManager()
    const {limit} = req.query

    const products = await pm.getProducts()
    if(limit && !isNaN(limit)) {
        const scope = Number(limit)
        products = products.slice(0, scope)
    }
    resp.send(productos)
    }catch (error){
        throw new error("error")
    }
})

app.get("/products/:id", async (req, resp) =>{
    try{
        const { id } = req.params()
        const pm = new ProductManager()
        const product = await pm.getProductsById(id)
        resp.send(product)
        }catch (error){
            throw new error("error")
        }
    resp.send()
})

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

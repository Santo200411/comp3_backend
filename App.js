import express from 'express'
import productsRouter from './routes/products_router.js'
import cartsRouter from './routes/cart_router.js'


const app = express()
const PORT = 5000

server.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use((err, req, res, next) => {
  console.error(err);
  const errorMessage = err.message || 'Internal Server Error';
  const statusCode = err.statusCode || 500;
  const errorDetails = err.details || null;
  res.status(statusCode).json({ error: errorMessage, details: errorDetails });
});

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});

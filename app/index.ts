require('dotenv').config()
import express from 'express';
import routes  from './routes';
import mongoose from 'mongoose';
const cors = require("cors");
const app = express()

//app.use("/static", express.static(__dirname +'/frontend/static'));
import errorHandler from './middlewares/errorHandler.middleware';

// conectando com banco
mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017' );

app.get('/', (req, res) => {
  res.send('Pixel API is working.')
})

//parar poder receber arquivos json
app.use(express.json());

//habilitando cors
app.use(cors());


//centralizando todas as rotas
app.use("/api", routes)

//custom error
app.use(errorHandler);

export default app;




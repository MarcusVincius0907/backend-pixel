require('dotenv').config()
import express from 'express';
import routes  from './routes';
const cors = require("cors");
const app = express()
const PORT = process.env.PORT || 3000;
//app.use("/static", express.static(__dirname +'/frontend/static'));
import errorHandler from './middlewares/errorHandler.middleware'

app.get('/', (req, res) => {
  res.send('Pixel API is working.')
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})


//parar poder receber arquivos json
app.use(express.json());

//habilitando cors
app.use(cors());


//centralizando todas as rotas
app.use("/api", routes)

//custom error
app.use(errorHandler);




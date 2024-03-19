import express from 'express'
import db from './config/db.js'
import routes from './routes/index.js'
import { PORT } from './config/environment.js'
 PORT = PORT || 3005
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()

db.connection.once('open', () => {
    console.log("connected to db");
  })
  .on('error', (e) => {
    console.log("error connecting db", e.message);
  });

app.listen(PORT, function () {
    console.log('Server is running at port ' + PORT)
})
  app.use(cors());
app.use(express.json())

//GET, POST, PUT, DELETE
app.use('/', routes)





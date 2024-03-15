import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

//config
dotenv.config();

//express app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


//middleware

//routes
app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});
//connect to mongodb
mongoose.connect(process.env.URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error: ', error.message);
    });
//listener
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ', process.env.PORT);
});

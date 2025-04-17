import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();


//! *** MIDDLEWARE ***
app.use(cors({
    credentials: true, // Allows cookies to be sent
    origin: 'http://localhost:8000', // Replace with frontend URL
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`Backend server is running on port: <b>${port}</b>`)
});


//! *** AUTH ROUTE ***
import Auth from './routes/Auth.js';
app.use('/auth', Auth);


//! *** API ROUTE ***
import Api from './routes/Api.js';
app.use('/api', Api);


//! *** SERVER ***
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})
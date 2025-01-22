import express from 'express';
import morgan from 'morgan';
import connect from './database/db.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/users',userRoutes);

app.get("/", (req,res) => {
    res.send("hello");
})

export default app;
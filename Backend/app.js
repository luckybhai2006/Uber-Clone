const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require('./db/db');
const userRouter = require('./routes/user.routes');
const captionRouter = require('./routes/caption.routes')
const cookieParser = require("cookie-parser");
const mapsRouter = require('./routes/maps.routes');
const rideRouter = require('./routes/ride.routes');
connectDB();

app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true,
 }));
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/',(req,res)=>{
   res.send("hellow world")
});

app.use('/users',userRouter);
app.use('/captions',captionRouter);
app.use('/maps', mapsRouter);
app.use('/rides', rideRouter);

module.exports = app
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require("cors");

require('./config/db');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const userRoute = require('./routes/userRoute');

app.use('/user', userRoute);



const server = app.listen(port, () => {
    console.log(`Server is running on port ${'http://127.0.0.1:5000'}`);
})

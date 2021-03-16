require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = require('./routes/index');
const connectToDb = require('./db/connectToDb');

const PORT = process.env.API_PORT || '5000';
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Invalid endpoint');
});

app.listen(PORT, async () => {
  console.log(`server started at port ${PORT}`);
  await connectToDb();
});

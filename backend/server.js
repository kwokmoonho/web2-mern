const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
).then(connect => console.log('connected to mongodb..')).catch(e => console.log('could not connect to mongodb', e))
module.exports = {mongoose};

const helpsRouter = require('./routes/helps');
const usersRouter = require('./routes/users');

app.use('/helps', helpsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

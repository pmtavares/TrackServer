require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json()); // have to be above app.use
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb://localhost:27017';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo')
});


app.get('/',requireAuth, (req, res)=> {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, ()=> {
    console.log('Listening on 3000')
})
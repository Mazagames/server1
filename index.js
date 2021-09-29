const express = require('express')
const apiRouter = require('./api/routes/index')
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 1000;
app.use(cors());
app.use(bodyParser.json());

//app.use('/api', apiRouter)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})
app.use('/api', apiRouter)
app.get('/', (req, res)=> { res.send('Sab Changa Ji!')})

app.listen(PORT, ()=> {
    console.log(`Server Started on Port ${PORT}`);
});
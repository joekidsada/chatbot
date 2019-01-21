const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
app.get('/',(req, res) => {
    res.send({status: 'ok'})
})
  
app.post('/webhook',(req, res) => {
    let body = req.body;
    let events = body.events[0];
    let source = events.source;
    let message = events.message;

    
    console.log(`source ==>`);
    console.log(source);
    console.log(`message ==>`);
    console.log(message);

    let response = { 
        status: 'ok',
        body: body
    }
    console.log("Body ==> ")
    console.log(body);
    res.send(response);
})

app.listen(port, () => {
    console.log(`server run on port ${port}`);
})
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
    let event = body.events[0];
    let source = event.source;
    let message = event.message;
    let type = event.type;
    console.log(`Body ==>`);
    console.log(body);
    console.log(`source ==>`);
    console.log(source);
    console.log(`message ==>`);
    console.log(message);
    console.log(`Type ==>`);
    console.log(type);

    switch (type) {
        case 'message':
            break;
        case 'fllow':
            break;
        case 'unfollow':
            break;
        default:
            break;
    }

    let response = { 
        status: 'ok',
        body: body
    }
    res.send(response);
})

app.listen(port, () => {
    console.log(`server run on port ${port}`);
})
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000
const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: 'wBV6w2r0JEXbApLEA0V4CexEEjg2GygvJSAJbqrxocoEvybEw7YwegdexcWkrq/hpoD4rJ0OIUMH/i2VW8zl17DKEAIMhKF+V0RdmXhaHqN2qyt4JXW3IbRyHA+orb8+wdWBju/ixQSHv3qJD3DJ+AdB04t89/1O/w1cDnyilFU='
});


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
    let replyToken = event.replyToken;

    console.log(`source ==>`);
    console.log(source);
    console.log(`message ==>`);
    console.log(message);
    console.log(`Type ==>`);
    console.log(type);
    console.log(`replyToken ==>`);
    console.log(replyToken);

    switch (type) {
        case 'message':
            let type = message.type;
            console.log(`type ==> ${type}`);

            if(type == 'text'){
                let text = message.text;
                const messageResponse = [
                  {
                    type: 'text',
                    text: `Joe สวัสดีจ้า มีอะไรก็มาดิคับ!!`
                  },
                  {
                    type: 'sticker',
                    stickerId: '2',
                    packageId: '1'
                  }
                ];
                  replyMessage(replyToken,messageResponse);
            }
            else if(type == 'sticker'){
                let stickerId = message.stickerId;
                let packageId = message.packageId;
            }

            // console.log(`type ==> `);
            // console.log(type);
            // console.log(`id ==> `);
            // console.log(id);
            // console.log(`text ==> `);
            // console.log(text);

            break;
        case 'fllow':
            break;
        case 'unfollow':
            break;
        case 'join':
            break;
        case 'leave':
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

//Method
const replyMessage = (replyToken, message) => {
    console.log('//////////////send TO user////////////////');
    console.log('==> [replyMessage]');
    console.log(`==> replyToken: ${replyToken}`)
    console.log('==> message: ')
    console.log(message);

    client.replyMessage('<replyToken>', message)
    .then(() => {
        console.log('replyMessage is successfully!!')
    })
    .catch((err) => {
        console.log(err);
    });
}


app.listen(port, () => {
    console.log(`server run on port ${port}`);
})
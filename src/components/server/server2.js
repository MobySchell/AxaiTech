const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

sgMail.setApiKey('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');

app.use(cors());


app.get('/', (req, res) => {
  res.send('Welcome');
});

//email page
app.get('/send-email', (req, res) =>{

  const {recipient, sender, topic, text } = req.query;

  const msg = {
    to: recipient,
    from: sender,
    subject: topic,
    text: text
  }

  // sgMail.send(msg)
  // .then((msg) => console.log(text))
  sgMail
  .send(msg)
  .then(() => {
    console.log("worked")
  })
  .catch(error => {
    // Log friendly error
    console.error(error);

    if (error.response) {
      // Extract error msg
      //const {message, code, response} = error;

      // Extract response msg
      //const {headers, body} = response;

      //console.error(body);
    }
  });


})

app.listen(4000, () => console.log("server running"))
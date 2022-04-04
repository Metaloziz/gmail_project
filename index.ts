const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const urlencodedParser = bodyParser.urlencoded({extended: false})

const {
  GMAIL_BOX_LOGIN,
  GMAIL_BOX_PASSWORD,
  GMAIL_RECIPIENT
} = process.env

app.get('/', (req, res) => {
  res.send('Hello World!')
})


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_BOX_LOGIN,
    pass: GMAIL_BOX_PASSWORD,
  },
});


app.post('/send', urlencodedParser, async (req, res) => {

  const {name, email, message} = req.body

  await transporter.sendMail({
    from: 'Portfolio',
    to: GMAIL_RECIPIENT,
    subject: "Hello from  portfolio",
    html: `<div>name: ${name}</div><div>contact: ${email}</div><div>message: ${message}</div>`,
  });

  res.send({result: "I got you data"})
})


const port = process.env.PORT

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
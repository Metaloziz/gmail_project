const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const port = 3010

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    // user: "andrewgaityportfolio@gmail.com",
    // pass: "sdfnsdFH9349345jr3i",
  },
});


app.post('/send', urlencodedParser, async (req, res) => {

  const {name, email, message} = req.body


  await transporter.sendMail({
    from: 'Portfolio, andrewgaityportfolio@gmail.com',
    to: "Andrewgaity@yandex.by",
    subject: "Hello from  portfolio",
    html: `<div>name: ${name}</div><div>contact: ${email}</div><div>message: ${message}</div>`,
  });
  // console.log(process.env.EMAIL)
  res.send({result: "I got you data"})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
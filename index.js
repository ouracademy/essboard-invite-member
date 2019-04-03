const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

const { sendMail } = require('./send-mail')

app.set("port", port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
    const { from, to, project } = req.body

    const info = await sendMail(from, to, project);
    return res.send(info)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
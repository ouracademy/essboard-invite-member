require("./env");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const { sendMail } = require("./send-mail");

app.set("port", port);
app.use(bodyParser.json());
app.use(cors({ origin: process.env.ORIGIN }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
    const { from, to, project, invitation } = req.body;

    const info = await sendMail(from, to, project, invitation);
    return res.send(info);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

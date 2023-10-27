const express = require("express");
const app = express()
require("dotenv").config();

//require('./database')
require("./middleware/auth");

const authRuoter = require('./routes/authRouter')
app.use('/auth', authRuoter);

const port = process.env.PORT ?? '4006'

app.listen(port, console.log("Listening on port http://localhost:" + port));
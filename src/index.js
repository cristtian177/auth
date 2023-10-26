const express = require("express");
const app = express()

require('./database')
require("./middleware/auth");

const authRuoter = require('./routes/authRouter')
app.use('/auth', authRuoter);

app.listen(5000, console.log("Listening on port http://localhost:5000"));

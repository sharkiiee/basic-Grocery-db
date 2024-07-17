const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const adminRoute = require("./routes/admin");

app.use(bodyParser.json());
app.use("/admin",adminRoute)

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
});
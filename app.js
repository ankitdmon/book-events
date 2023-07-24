const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5001;
const app = express();

app.get("/", (req, res )=> {
    res.send("<h1>Hello GraphQL!!</h1>")
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

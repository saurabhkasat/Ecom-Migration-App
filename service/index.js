const express = require('express');
const bp = require('body-parser')
const app = express();
const port = 4000

app.use(bp.json({ limit: '500mb' }))
app.use(bp.urlencoded({ extended: true, limit: '500mb' }))
app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./routes/order')(app);

// Server Running
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
const Order = require('../dao/order');

module.exports = function (app) {
    app.get('/orders', async (req, res) => {
        try {
            const order = new Order();
            const result = await order.getOrders(req.query.pn, req.query.ps);
            res.end(JSON.stringify(result));
        }
        catch (error) {
            console.log(error); //Erros should be logged to File
            res.status(error.statusCode || 500).send(error.message)
        }
    });

    app.post('/orders', async (req, res) => {
        try {
            const order = new Order();
            const result = await order.saveOrders(req.body);
            res.end(JSON.stringify(result));
        }
        catch (error) {
            console.log(error); //Erros should be logged to File
            res.status(error.statusCode || 500).send(error.message)
        }
    });
}
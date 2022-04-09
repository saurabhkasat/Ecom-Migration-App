//Require the dev-dependencies
const { json } = require('body-parser');
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
const server = 'http://localhost:4000';
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
    /*
      * Test the /GET route
      */
    describe('/GET Orders test total order count should be greater than -1 & page 1 should return orders between 0 to 10 as the page size is passed to 10', () => {
        it('it should GET first 10 orders', (done) => {
            chai.request(server)
                .get('/orders?pn=1&ps=10')
                .end((err, res) => {
                    res.should.have.status(200);
                    const rows = JSON.parse(res.text).rows;
                    rows.should.be.a('array');
                    rows.length.should.be.above(-1);
                    rows.length.should.be.below(11);
                    parseInt(JSON.parse(res.text).totalRows).should.be.above(-1);
                    done();
                });
        });
    });

    describe('/POST orders', () => {
        it('it should POST a orders ', (done) => {
            let order = [{
                "Country": "Morocco",
                "Item Type": "Clothes",
                "Order Date": "9/14/2013",
                "Order ID": "167593514",
                "Order Priority": "M",
                "Region": "Middle East and North Africa",
                "Sales Channel": "Online",
                "Ship Date": "10/19/2013",
                "Total Cost": "165258.24",
                "Total Profit": "338631.84",
                "Total Revenue": "503890.08",
                "Unit Cost": "35.84",
                "Unit Price": "109.28",
                "Units Sold": "4611"
            }]
              chai.request(server)
              .post('/orders')
              .send(order)
              .end((err, res) => {
                    res.should.have.status(200);
                    console.log(JSON.stringify(res))
                    const text  = JSON.parse(res.text) //.save_orders
                    console.log(text)
                    text.should.be.a('boolean');
                    text.should.be.eql(true);
                done();
              });
        });
    });

});
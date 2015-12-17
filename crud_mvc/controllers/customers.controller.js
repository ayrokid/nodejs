/* Load Model */
var Customers = require('../models/customers.model.js');
var CustomersModel = new Customers();

/* Create Controller Class Customer */
var CustomerController = module.exports = function(config) {

}

CustomerController.prototype.all = function (callback) {
    CustomersModel.getAll(function(rows) {
        res.render('customers', {page_title:'Customers - Node.js', data:rows});
    });
};

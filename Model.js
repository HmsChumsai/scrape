var mongoose = require('mongoose');

mongoose.connect('mongodb://takefive:57069610@ds063140.mongolab.com:63140/dropship');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
var ListingsSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  description:String,
  url: String
});
module.exports = mongoose.model('Listings', ListingsSchema);
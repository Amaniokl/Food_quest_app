const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const geolib=require('geolib');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes.js'); // Ensure this path is correct

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://amanoutlook2003:aman@cluster1.mqmno.mongodb.net/zomato?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB successfully');
});
// Use the restaurant routes
app.use('/api', restaurantRoutes); // Ensure restaurantRoutes is a valid router

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    "restaurant_id": 6317637,
    "restaurant_name": "Le Petit Souffle",
    "country_code": "162",
    "city": "Makati City",
    "address": "Third Floor, Century City Mall, Kalayaan Avenue, Poblacion, Makati City",
    "locality": "Century City Mall, Poblacion, Makati City",
    "locality_verbose": "Century City Mall, Poblacion, Makati City, Makati City",
    "location": {
      "type": "Point",
      "coordinates": [121.027535, 14.565443]
    },
    "cuisines": "French, Japanese, Desserts",
    "average_cost_for_two": 1100,
    "currency": "Botswana Pula(P)",
    "has_table_booking": true,
    "has_online_delivery": false,
    "is_delivering_now": false,
    "switch_to_order_menu": false,
    "price_range": 3,
    "aggregate_rating": 4.8,
    "rating_color": "Dark Green",
    "rating_text": "Excellent",
    "votes": 314,
    "photos_url": "https://www.zomato.com/manila/le-petit-souffle-poblacion-makati-city/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
    "url": "https://www.zomato.com/manila/le-petit-souffle-poblacion-makati-city?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    "menu_url": "https://www.zomato.com/manila/le-petit-souffle-poblacion-makati-city/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
    "book_url": "https://www.zomato.com/manila/le-petit-souffle-poblacion-makati-city/book?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    "featured_image": "https://b.zmtcdn.com/data/pictures/chains/7/6317637/e906d115281b8aaaa2c0137de5ccb0da_featured_v2.jpg"
  });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;

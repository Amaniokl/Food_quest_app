[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/JTy-CUJF)
# Project Assignment: Zomato Restaurant Listing & Searching
 
## Key Use Cases
 
### Data Loading
Create an independent script to load the Zomato restaurant data available [here](https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data) into a database.
 
### Web API Service
Develop a web API service with the following endpoints to serve the content loaded in the previous step:
  - **Get Restaurant by ID**: Retrieve details of a specific restaurant by its ID.
  - **Get List of Restaurants**: Fetch a list of restaurants with pagination support.
 
### User Interface
Develop a web application with the following pages, which must connect to the web API service:
  - **Restaurant List Page**: Display a list of restaurants. Clicking on a restaurant should navigate the user to the restaurant's detail page.
  - **Restaurant Detail Page**: Show details of a specific restaurant.
  - **Location search**: Search restaurants in given latitude and longitude range (e.g restaurants in 3 km of a given latitude and longitude)
  - **Image search**: Upload an image of a food like icecream, pasta etc., and search restaurants which offer those cuisines.

## Additional Use Cases (Optional)
If time allows, implement the following additional features, ensuring they are supported in both the API and the UI:
- **Filtering Options**:
  - By Country
  - By Average Spend for Two People
  - By Cuisines
- **Search Functionality**: Enable search for restaurants by name and description.

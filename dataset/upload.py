import pandas as pd
from pymongo import MongoClient
from urllib.parse import quote_plus

username = quote_plus("amanoutlook2003")
password = quote_plus("Aman@2003")

client = MongoClient(f"mongodb+srv://{username}:{password}@cluster0.06bk8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["Zomato_data"]  # replace with your database name
collection = db["Records"]  # replace with your collection name

# Read CSV file
csv_file = "/home/aman/Documents/typeface/dataset/updated_data.csv"  # replace with your CSV file path
data = pd.read_csv(csv_file)

# Convert DataFrame to dictionary records and insert into MongoDB
collection.insert_many(data.to_dict("records"))

print("CSV data successfully inserted into MongoDB.")

import pandas as pd
import psycopg2

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    dbname="travel_bot",
    user="postgres",
    password="8012437667",
    host="localhost",
    port="5432"
)

# Load Excel file into DataFrame
df = pd.read_excel(r"C:\\Users\\olive\Downloads\\ForLapis_Cat_SubCat_List (2).xlsx")

# Create cursor
cur = conn.cursor()

# Create table if it doesn't exist
# cur.execute("""
#     CREATE TABLE IF NOT EXISTS for_lapis_cat_subcat (
#         id SERIAL PRIMARY KEY,
#         category_name VARCHAR,
#         sub_category_name VARCHAR
#     )
# """)

# Commit the table creation
conn.commit()

# Insert data into PostgreSQL table
for index, row in df.iterrows():
    category_name = row['Category name']
    if isinstance(category_name, str) and category_name.strip(): 
        cur.execute("INSERT INTO for_lapis_cat_subcat (category_name, sub_category_name) VALUES (%s, %s)", (category_name, row['Sub - Category Name']))
        cat_name = category_name
    elif cat_name is not None: 
        cur.execute("INSERT INTO for_lapis_cat_subcat (category_name, sub_category_name) VALUES (%s, %s)", (cat_name, row['Sub - Category Name']))
conn.commit()

# Close cursor and connection
cur.close()
conn.close()








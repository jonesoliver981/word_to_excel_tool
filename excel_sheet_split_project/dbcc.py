import pandas as pd
import psycopg2
from sqlalchemy import text
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

POSTGRESQL_USER = 'postgres'
POSTGRESQL_PASSWORD = '8012437667'
POSTGRESQL_HOST_IP = 'localhost'
POSTGRESQL_PORT = '5432'
POSTGRESQL_DATABASE = 'travel_bot'

# Establish connection to PostgreSQL database
conn = psycopg2.connect(
    dbname=POSTGRESQL_DATABASE,
    user=POSTGRESQL_USER,
    password=POSTGRESQL_PASSWORD,
    host=POSTGRESQL_HOST_IP,
    port=POSTGRESQL_PORT
)
df = pd.read_excel(r'E:\Excel_django\backend\excel_sheet_split_project\ForLapis_Cat_SubCat_List.xlsx')

# Create the SQLAlchemy engine
engine = create_engine(f'postgresql+psycopg2://{POSTGRESQL_USER}:{POSTGRESQL_PASSWORD}@{POSTGRESQL_HOST_IP}:{POSTGRESQL_PORT}/{POSTGRESQL_DATABASE}')

# Create a base class for declarative class definitions
Base = declarative_base()

# Define your existing table
class OriginalTable(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    category_name = Column(String)

# Define the new table with a foreign key relationship
class NewTable(Base):
    __tablename__ = 'sub_category'

    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey('category.id'))
    sub_category = Column(String)
    category = relationship("OriginalTable")

# Create the tables in the database
Base.metadata.create_all(engine)

# Populate the quilbot table
categories = df['category'].unique()  # Get unique category names
cursor = conn.cursor()
for category in categories:
    cursor.execute("INSERT INTO category (category_name) VALUES (%s)", (category,))
conn.commit()
cursor.close()

# Populate the subcategory table
cursor = conn.cursor()
for index, row in df.iterrows():
    cursor.execute("SELECT id FROM category WHERE category_name=%s", (row['category'],))
    category_id = cursor.fetchone()[0]
    cursor.execute("INSERT INTO sub_category (category_id, sub_category_name) VALUES (%s, %s)", (category_id, row['Sub - Category Name']))
conn.commit()
cursor.close()

# Close the connection
conn.close()

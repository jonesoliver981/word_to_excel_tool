import pandas as pd 

csv_file_path =r'E:\Excel_django\backend\excel_sheet_split_project\For Solomon - Modern Tourist Icons (1).csv'
df = pd.read_csv(csv_file_path)
product_names = df['Product_Name'].unique()
excel_writer = pd.ExcelWriter('output3.xlsx',engine='xlsxwriter')
for product_name in product_names:
    truncated_name = product_name[:31]
    breakpoint()
    product_df = df[df['Product_Name']==product_name]
    product_df.to_excel(excel_writer, sheet_name=truncated_name, index=False)
excel_writer.save()




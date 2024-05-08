from django.db import models


class Category(models.Model):
    id  = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100)
    class Meta:
        db_table="category"



class SubCategory(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category ,on_delete=models.CASCADE)
    sub_category_name= models.CharField(max_length=254)
    class Meta:
        db_table="sub_category"














# class Category(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name

# class Subcategory(models.Model):
#     name = models.CharField(max_length=100)
#     category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)

#     def __str__(self):
#         return self.name
# from django.db import models

# class Category(models.Model):
#     id = models.AutoField(primary_key=True)
#     category_name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.category_name

# class Subcategory(models.Model):
#     id = models.AutoField(primary_key=True)
#     category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)
#     sub_category_name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.sub_category_name

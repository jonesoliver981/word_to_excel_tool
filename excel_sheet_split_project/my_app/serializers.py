
from rest_framework import serializers
from .models import Category,SubCategory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'


class FileSubcategorySerializer(serializers.Serializer):
    file = serializers.FileField(allow_empty_file=False)
    subcategory = serializers.CharField()

class FileUploadSerializer(serializers.Serializer):
    file_subcategories = FileSubcategorySerializer(many=True)

    def validate_file_subcategories(self, value):
        if not value:
            raise serializers.ValidationError("No files provided.")
        return value

    def create(self, validated_data):
        
        pass





# class SubcategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Subcategory
#         fields = ['name']

# class CategorySerializer(serializers.ModelSerializer):
#     sub_categories = serializers.SerializerMethodField()

#     class Meta:
#         model = Category
#         fields = ['name', 'sub_categories']

#     def get_sub_categories(self, obj):
#         subcategories = Subcategory.objects.filter(category=obj)
#         return SubcategorySerializer(subcategories, many=True).data
# # from rest_framework import serializers
# # from .models import Category, Subcategory

# # class SubcategorySerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Subcategory
# #         fields = ['sub_category_name']  # Adjusted field name

# # class CategorySerializer(serializers.ModelSerializer):
# #     sub_categories = SubcategorySerializer(many=True, read_only=True)  # Use SubcategorySerializer directly

# #     class Meta:
# #         model = Category
# #         fields = ['category_name', 'sub_categories']  # Adjusted field name

# # class FileSubcategorySerializer(serializers.Serializer):
# #     file = serializers.FileField(allow_empty_file=False)
# #     subcategory = serializers.CharField()

# # class FileUploadSerializer(serializers.Serializer):
# #     file_subcategories = FileSubcategorySerializer(many=True)

# #     def validate_file_subcategories(self, value):
# #         if not value:
# #             raise serializers.ValidationError("No files provided.")
# #         return value

# #     def create(self, validated_data):
# #         # Implement your creation logic here
# #         pass




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






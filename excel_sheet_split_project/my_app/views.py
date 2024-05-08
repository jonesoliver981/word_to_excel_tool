
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from openpyxl import Workbook
import json
import pandas as pd
from my_app.serializers import FileUploadSerializer
from io import BytesIO
from django.http import HttpResponse,JsonResponse
from .models import Category,SubCategory
from .serializers import CategorySerializer,SubCategorySerializer
from .utils import read_document_and_extract_data,write_dicts_to_excel
from rest_framework.exceptions import ValidationError,NotFound
from django.db import transaction


class FileCombinedApi(APIView):
    def get(self, request, format=None):

        categories = Category.objects.all()
        serialized_data = []
        for category in categories:
            category_data = {
                "id":category.id,
                "category": category.category_name,
            }
            subcategories = SubCategory.objects.filter(category=category)
            for i, subcategory in enumerate(subcategories, start=1):
                category_data[f"sub category {i}"] = subcategory.sub_category_name
            
            serialized_data.append(category_data)
        
        return Response(serialized_data)
   

    def post(self, request):
        uploaded_datas=request.data.keys()
        uploaded_data1 = [uploaded_data for uploaded_data in uploaded_datas if uploaded_data.startswith('category')]
        file_datas = request.data.keys()
        file_data1 = [file_data for file_data in file_datas if file_data.startswith('file')]
        if uploaded_data1:
            return self.Add_Category(request)
        elif file_data1:
            return self.FileHandle(request)


    def Add_Category(self,request):
            data = request.data
            category_name = data.get('category_name')
            sub_category_names = data.get('sub_category_name')
            if not sub_category_names:
                if Category.objects.filter(category_name=category_name).exists():
                    return Response({"message": "This Category already exists"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    category = Category.objects.create(category_name=category_name)
            else:
                try:
                    with transaction.atomic():
                        category = Category.objects.create(category_name=category_name)
                        for sub_category_name in sub_category_names:
                            SubCategory.objects.create(category=category, sub_category_name=sub_category_name)
                    return Response({"message": "Category and subcategories created successfully", "id": category.id}, status=status.HTTP_201_CREATED)
                except Exception as e:
                    return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
          

    def FileHandle(self,request):
        file_datas = request.data.keys()
        file_data1 = [file_data for file_data in file_datas if file_data.startswith('file')]
        if file_data1:
            file_subcategories = []
            for key in request.data.keys():
                if 'subcategory' not in key:
                    files = request.FILES.getlist(key)
                    subcategory_key = f"{key}_subcategory"
                    subcategory = request.data.get(subcategory_key)
                    for file in files:
                        file_subcategories.append({'file': file, 'subcategory': subcategory})

            serializer = FileUploadSerializer(data={'file_subcategories': file_subcategories})
            if serializer.is_valid():
                output_excel = Workbook()
                any_sheets = False
                all_data_dicts = []
                unique_subcategories = set(subcategory['subcategory'] for subcategory in file_subcategories)
                for subcategory in unique_subcategories:
                    subcategory_data_dicts = []
                    for file_subcategory in file_subcategories:
                        if file_subcategory['subcategory'] == subcategory:
                            excel_file = file_subcategory['file']
                            data_dicts,header =read_document_and_extract_data(excel_file)
                            subcategory_data_dicts.extend(data_dicts)
                            # subcategory_data_dicts.extend(extract_data_from_documents(excel_file))
                            
                    all_data_dicts.extend(subcategory_data_dicts)
                    output_sheet = output_excel.create_sheet(title=subcategory[:31])
                    headers = write_dicts_to_excel(subcategory_data_dicts).columns.tolist()
                    output_sheet.append(headers)
                    if not subcategory_data_dicts:
                        return JsonResponse({"error": f"No data found for subcategory: {subcategory}"}, status=status.HTTP_400_BAD_REQUEST)
                    df_filtered = write_dicts_to_excel(subcategory_data_dicts)
                    for _, row in df_filtered.iterrows():
                        row_values = row.tolist()
                        output_sheet.append(row_values)
                    any_sheets = True

                if any_sheets:
                    default_sheet = output_excel.active
                    output_excel.remove(default_sheet)

                    buffer = BytesIO()
                    output_excel.save(buffer)
                    buffer.seek(0)

                    response = HttpResponse(buffer.getvalue(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    response['Content-Disposition'] = 'attachment; filename="combined.xlsx"'
                    return response
                else:
                    return JsonResponse({"error": "No data found for any subcategory"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                print(serializer.errors)
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        
    def delete(self, request, id=None, sub_category_name=[], format=None):

        if id and sub_category_name:
            breakpoint()
            return self.delete_sub_category_name(id, sub_category_name)
        elif id:
            return self.delete_category(id)
        else:
            return Response({"message": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)
        

    def delete_category(self,  id):

        try:
            category = Category.objects.get(id=id)
            subcategories = SubCategory.objects.filter(category=category)
            category.delete()
            subcategories.delete()
            return Response({"message": f"Category  and its subcategories deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response({"message": f"Category  does not exist"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def delete_sub_category_name(self,id,sub_category_name):
        try:
            category = Category.objects.get(category_name=id)
            subcategories = SubCategory.objects.filter(category=category, sub_category_name__in=sub_category_name)
            subcategories.delete()
            return Response({"message": f"Subcategories '{', '.join(sub_category_name)}' in category  deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response({"message": f"Category  does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def put(self, request, id=None,category_name=None, format=None):

        if category_name and id:
            return self.update_category_and_subCategory(request,id)
        
        elif id:
             return self.update_category(request, id)
        
        else:
            return Response({"message": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)


    def update_category(self, request, id):

        try:
            categories = Category.objects.filter(id=id)
            if not categories.exists():
                return Response({'message': 'Category not Found'}, status=status.HTTP_400_BAD_REQUEST)
        except Category.MultipleObjectsReturned:
            return Response({'message': 'Duplicate category names found. Please fix data consistency.'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        new_category_name = data.get('category')
        for category in categories:
            if new_category_name and new_category_name != category.category_name:
                category.category_name = new_category_name
                category.save()
            else:
                return Response({'message': 'Category was not updated!!!'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Category was updated successfully'}, status=status.HTTP_200_OK)
    

    def update_category_and_subCategory(self, request, id):

        try:
            categories = Category.objects.filter(id=id)
            if not categories.exists():
                return Response({'message': 'Category not found'}, status=status.HTTP_400_BAD_REQUEST)
        except Category.MultipleObjectsReturned:
            return Response({'message': 'Duplicate category names found. Please fix data consistency.'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        new_category_name = data.get('category')
        sub_len = sum(1 for key in data.keys() if key.startswith('sub category'))
        for category in categories:
            if new_category_name and new_category_name != category.category_name:
                category.category_name = new_category_name
                category.save()

        for i in range(1,sub_len+1):
            sub_category_key = f'sub category {i}'
            sub_category_value = data.get(sub_category_key)
            if sub_category_value:
                subcategory, _ = SubCategory.objects.get_or_create(category=category, sub_category_name=sub_category_value)
                subcategory.sub_category_name = sub_category_value
                subcategory.save()
            else:
                return Response({'message': 'subcategories are not updated!!'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Category and subcategories updated successfully'}, status=status.HTTP_200_OK)
    




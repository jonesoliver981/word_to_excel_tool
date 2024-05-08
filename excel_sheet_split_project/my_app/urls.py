from django.urls import path
from .views import FileCombinedApi

app_name = 'my_app'

urlpatterns = [
    path('combine-excel/', FileCombinedApi.as_view(), name='combine_excel'),
    path('categories/', FileCombinedApi.as_view(), name='category-list'),
    path('categories/<str:category_name>/', FileCombinedApi.as_view(), name='category-detail'),
    path('categories/<int:id>/update/', FileCombinedApi.as_view(), name='category-update'),  
    path('categories/<int:id>/<str:category_name>/update-subcategories/', FileCombinedApi.as_view(), name='category-update-subcategories'),  # Added URL pattern for updating subcategories
    path('categories/<int:id>/delete/', FileCombinedApi.as_view(), name='category-delete'),
    path('subcategories/<int:id>/<str:sub_category_name>/delete/', FileCombinedApi.as_view(), name='subcategory-delete'),
]

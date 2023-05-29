from django.urls import path

from . import views
urlpatterns = [
    path('list/',views.AssetsList.as_view()),
    path('search/', views.AssetsSearch.as_view()),
    path('manage/', views.AssetsManage.as_view())
    
]
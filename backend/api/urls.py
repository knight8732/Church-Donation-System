from django.contrib import admin
from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'members', MembersViewSet, basename='members')
router.register(r'churches', ChurchesViewSet, basename='churches')
router.register(r'donations', DonationsViewSet, basename='donations')
urlpatterns = router.urls

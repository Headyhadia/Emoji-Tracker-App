from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmojiEntryViewSet

router = DefaultRouter()
router.register(r'emojis', EmojiEntryViewSet, basename='emoji')

urlpatterns = [
    path('', include(router.urls)),
]
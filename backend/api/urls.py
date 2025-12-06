from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmojiUsageViewSet

router = DefaultRouter()
router.register(r'emojis', EmojiUsageViewSet, basename='emoji')

urlpatterns = [
    path('', include(router.urls)),
]
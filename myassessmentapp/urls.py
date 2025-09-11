from django.urls import path, include
from .views import LoginAPIView, UploadViewSet
from rest_framework.routers import DefaultRouter

# NS

router = DefaultRouter()
router.register(r'upload', UploadViewSet, basename='upload')

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login_api'),
    path('', include(router.urls)),
]
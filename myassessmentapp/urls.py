from django.urls import path, include
from .views import LoginAPIView, UploadViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'documents', UploadViewSet, basename='documents')

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login_api'),   
    path('', include(router.urls)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
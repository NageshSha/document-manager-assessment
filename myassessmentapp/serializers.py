from rest_framework import serializers
from rest_framework.serializers import FileField
from django.contrib.auth.models import User
from .models import UploadFile

# NS Serializers
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

# NS
class UploadSerializer(serializers.Serializer):
    file_uploaded = FileField()
    class Meta:
        fields = ['file_uploaded']
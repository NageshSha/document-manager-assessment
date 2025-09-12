from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UploadFile


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class UploadSerializer(serializers.Serializer):
    class Meta:
        model = UploadFile
        fields = '__all__'

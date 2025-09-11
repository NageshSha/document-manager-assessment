from django.shortcuts import render

# NS Views changes

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import UserLoginSerializer
from rest_framework import viewsets, parsers
from .models import UploadFile
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.viewsets import ViewSet
from .serializers import UploadSerializer
from django.core.files.storage import FileSystemStorage

class LoginAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            loginUser = authenticate(request, username=username, password=password)

            if loginUser is not None:
                token, created = Token.objects.get_or_create(user=loginUser)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UploadViewSet(ViewSet):
    serializer_class = UploadSerializer
    def list(self, request):
        pass

    def create(self, request):
        file_uploaded = request.FILES.get('file_uploaded')
        filesys = FileSystemStorage()
        filename = filesys.save(file_uploaded.name, file_uploaded)
        response = "POST API and you have uploaded a {} file".format(content_type)
        return Response(response)

class VersionAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            loginUser = authenticate(request, username=username, password=password)

            if loginUser is not None:
                token, created = Token.objects.get_or_create(user=loginUser)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        pass
from django.test import TestCase

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

# NS
class MyAPITestCase(APITestCase):
    def test_token(self):
        self.user = User.objects.create_user(username='admin', password='admin')
        self.token = Token.objects.create(user=self.user)
        print(f"Token: {self.token}")
        self.assertTrue(True)


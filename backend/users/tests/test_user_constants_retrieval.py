from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()

class ConstantsRetrievalTests(TestCase):

  def setUp(self):
    self.client = APIClient()
    self.constants_url = reverse("users:user-constants")
    self.user = User.objects.create_user(
      username="user1"
    )


  def test_get_user_constants_successful(self):
    """Test that the user constants can be retrieved successfully"""
    self.client.force_authenticate(user=self.user)
    data = {}

    response = self.client.get(self.constants_url, data, format="json")

    self.assertEqual(response.status_code, status.HTTP_200_OK)

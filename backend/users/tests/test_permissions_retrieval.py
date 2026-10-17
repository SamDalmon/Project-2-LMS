from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role
from users.roles import createAvailablePermissions, Teacher

User = get_user_model()

class PermissionsRetrievalTests(TestCase):

  def setUp(self):
    """Set up initial data for tests"""
    self.client = APIClient()
    self.permissions_url = reverse("users:user-permissions")
    self.user = User.objects.create_user(
      username = "user1"
    )

  def test_get_users_permissions_success(self):
    """Test that the permissions for a user with a role can be retrieved correctly"""
    assign_role(self.user, Teacher)
    self.client.force_authenticate(user=self.user)
    data = {}

    response = self.client.get(self.permissions_url, data, format='json')
    
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertIn("permissions", response.json())


  def test_get_user_permissions_failure(self):
    """Test that there are no permissions for a user without a role"""
    self.client.force_authenticate(user=self.user)
    data = {}

    response = self.client.get(self.permissions_url, data, format='json')
    
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    data = response.json()
    self.assertEqual(data["permissions"],[])
    self.assertEqual(data["roles"],[])
    
    
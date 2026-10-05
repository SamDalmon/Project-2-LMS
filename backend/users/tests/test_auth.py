
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

# Auth tests created with help from Gemini
User = get_user_model()

class AuthTests(TestCase):

  def setUp(self):
    """Set up initial data for the tests."""
    self.signup_url = reverse("rest_register") # URL name for signup
    self.login_url = reverse("rest_login")

    self.username = "testuser"
    self.email = "testuser@example.com"
    self.password = "SecurePass123!"

    # Create a pre-existing user in the test database for login scenarios
    self.existing_user = User.objects.create_user(
      username = "existingUser",
      email = "existing@example.com",
      password = self.password
    )

  def test_signup_successful(self):
    """Ensure a user can successfully register via the signup endpoint."""
    data = {
      "username": self.username,
      "email": self.email,
      "password1": self.password,
      "password2": self.password,
    }

    response = self.client.post(self.signup_url, data, format='json')

    # Verify response status code and presence of auth token
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertIn('key', response.data)

    # Verify user was actually saved to the database
    self.assertTrue(User.objects.filter(username=self.username).exists())

  def test_signup_fails_with_existing_username(self):
    """Ensure registration failed if the username is already taken"""
    data = {
       "username": "existingUser",
       "email": "different_email@example.com",
       "password1": self.password,
       "password2": self.password,
    }

    response = self.client.post(self.signup_url, data, format='json')

    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertIn('username', response.data)

  def test_login_successful(self):
    """Ensure an existing user can log in and receive an auth token."""
    data = {
      "username": "existingUser",
      "password": self.password,
    }

    response = self.client.post(self.login_url, data, format='json')

    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertIn('key', response.data)

  def test_login_fails_with_invalid_credentials(self):
     """Ensure login fails when providing a wrong password."""
     data = {
        "username": "existingUser",
        "password": "WrongPassword!",
     }

     response = self.client.post(self.login_url, data, format='json')

     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
     self.assertNotIn('key', response.data)
     self.assertIn('non_field_errors', response.data)

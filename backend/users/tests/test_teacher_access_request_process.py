from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role
from rolepermissions.checkers import has_role
from ..roles import Admin, Teacher
from ..models import CustomUser

User = get_user_model()

class AccessRequestTests(TestCase):

  def setUp(self):
      """Set up initial data for the tests."""
      self.client = APIClient()

      self.teacher_signup_url = reverse("users:teacher-register") # URL name for signup
      self.user = User.objects.create_user(username="adminUser", password="password")

      self.username = "testuser"
      self.email = "testuser@example.com"
      self.password = "SecurePass123!"
      self.first_name = "John"
      self.last_name = "Doe"

  def signupTeacher(self):
    data = {
      "username": self.username,
      "email": self.email,
      "password1": self.password,
      "password2": self.password,
      "first_name": self.first_name,
      "last_name": self.last_name,
    }    

    response = self.client.post(self.teacher_signup_url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    user = User.objects.get(pk=response.data.get('user_id'))
    self.assertTrue(has_role(user, Teacher))
    self.assertEqual(user.status, CustomUser.StatusChoices.PENDING)

    return user


  def test_teacher_approve_failed(self):
    """Test approving a user while not being authenticated"""
    teacher = self.signupTeacher()
    approve_url = reverse("users:users-approve", kwargs={"pk": teacher.pk})
    data = {}
    response = self.client.post(approve_url, data, format='json')
    updated_teacher = User.objects.get(pk=teacher.pk)
    
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    self.assertEqual(updated_teacher.status, CustomUser.StatusChoices.PENDING)


  def test_teacher_reject_failed(self):
    """Test rejecting a user while not being authenticated"""
    teacher = self.signupTeacher()
    reject_url = reverse("users:users-reject", kwargs={"pk": teacher.pk})
    data = {}
    response = self.client.post(reject_url, data, format='json')
    updated_teacher = User.objects.get(pk=teacher.pk)

    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    self.assertEqual(updated_teacher.status, CustomUser.StatusChoices.PENDING)


  def test_teacher_approve_not_authorized_failed(self):
      """Test approving a user while not being authorized"""
      teacher = self.signupTeacher()
      approve_url = reverse("users:users-approve", kwargs={"pk": teacher.pk})
      data = {}
      self.client.force_authenticate(user=self.user)
      
      response = self.client.post(approve_url, data, format='json')
      updated_teacher = User.objects.get(pk=teacher.pk)
      
      self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
      self.assertEqual(updated_teacher.status, CustomUser.StatusChoices.PENDING)
  
  
  def test_teacher_reject_not_authorized_failed(self):
    """Test rejecting a user while not being authorized"""
    teacher = self.signupTeacher()
    reject_url = reverse("users:users-reject", kwargs={"pk": teacher.pk})
    data = {}
    self.client.force_authenticate(user=self.user)

    response = self.client.post(reject_url, data, format='json')
    updated_teacher = User.objects.get(pk=teacher.pk)

    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    self.assertEqual(updated_teacher.status, CustomUser.StatusChoices.PENDING)


  def test_teacher_approve_successful(self):
    """Test approving a user while being authenticated and authorized"""
    teacher = self.signupTeacher()
    approve_url = reverse("users:users-approve", kwargs={"pk": teacher.pk})
    data = {}
    assign_role(self.user, Admin)
    self.client.force_authenticate(user=self.user)

    response = self.client.post(approve_url, data, format='json')
    updated_teacher = User.objects.get(pk=teacher.pk)
    print(response)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(updated_teacher.status, CustomUser.StatusChoices.ACTIVE)


  def test_teacher_reject_successful(self):
    """Test rejecting a user while being authenticated and authorized"""
    teacher = self.signupTeacher()
    reject_url = reverse("users:users-reject", kwargs={"pk": teacher.pk})
    data = {}
    assign_role(self.user, Admin)
    self.client.force_authenticate(user=self.user)

    response = self.client.post(reject_url, data, format='json')
    updated_teacher = User.objects.get(pk=teacher.pk)
    print(response)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(updated_teacher.status, CustomUser.StatusChoices.REJECTED)


  
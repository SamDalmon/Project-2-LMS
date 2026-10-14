from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role
from ..models import Course
from users.roles import Student

User = get_user_model()

class UserEnrollmentManagementTests(TestCase):

  def setUp(self):
    """Set up initial data for tests"""
    self.client = APIClient()

    self.password = "SecurePass123!"

    self.user1 = User.objects.create_user(
      username = "user1",
      email = "user1@example.com",
      password = self.password
    )
    self.user2 = User.objects.create_user(
      username = "user2",
      email = "user2@example.com",
      password = self.password
    )

    self.course1 = Course.objects.create(
      name = "course 1",
      description = "This is a course"
    )
    self.course2 = Course.objects.create(
      name = "course 2",
      description = "This is a course"
    )

  def test_course_enrollment_success(self):
    """Ensure a student can successfully enroll in a course"""
    enroll_url = reverse("api:course-enrollments-enroll", kwargs={"pk": self.course1.pk})
    assign_role(self.user1, Student)
    self.client.force_authenticate(user=self.user1)

    data = {}
    response = self.client.post(enroll_url, data, format='json')
    
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)




    

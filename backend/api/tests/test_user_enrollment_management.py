from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role
from ..models import Course, CourseEnrollment
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
      password = self.password,
    )
    self.user2 = User.objects.create_user(
      username = "user2",
      email = "user2@example.com",
      password = self.password,
    )

    self.course1 = Course.objects.create(
      name = "course 1",
      description = "This is a course",
    )
    self.course2 = Course.objects.create(
      name = "course 2",
      description = "This is a course",
    )
    self.course3 = Course.objects.create(
      name = "course 3",
      description = "This is a course",
    )


  def test_course_enrollment_success(self):
    """Ensure a student can successfully enroll in a course"""
    enroll_url = reverse("api:enrollment-actions-enroll", kwargs={"pk": self.course1.pk})
    assign_role(self.user1, Student)
    self.client.force_authenticate(user=self.user1)

    data = {}
    response = self.client.post(enroll_url, data, format='json')
    
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)


  def test_course_unenrollment_success(self):
    """Ensure a student can successfully unenroll in a course"""
    CourseEnrollment.objects.create(
        user_id = self.user1,
        course_id = self.course1,
    )
    unenroll_url = reverse("api:enrollment-actions-unenroll", kwargs={"pk": self.course1.pk})
    
    assign_role(self.user1, Student)
    self.client.force_authenticate(user=self.user1)  
    data = {}
    response = self.client.post(unenroll_url, data, format='json')
    
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


  def test_course_unenrollment_failure(self):
    """Ensure a error is thrown if a student tries to unenroll from a course they're not enrolled in"""
    unenroll_url = reverse("api:enrollment-actions-unenroll", kwargs={"pk": self.course1.pk})
    
    assign_role(self.user1, Student)
    self.client.force_authenticate(user=self.user1)  
    data = {}
    response = self.client.post(unenroll_url, data, format='json')
    
    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



    

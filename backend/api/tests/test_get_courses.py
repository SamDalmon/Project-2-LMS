from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role
from users.roles import Student
from ..models import Course, CourseEnrollment

User = get_user_model()

class GetCoursesTests(TestCase):
  def setUp(self):
    self.client = APIClient()

    self.password = "SecurePass123!"

    self.studentUser = User.objects.create_user(
      username = "user1",
      email = "user1@example.com",
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


  def test_get_all_courses(self):
    """Test getting all courses"""
    get_courses_url = reverse("api:course-list-create-list")
    self.client.force_authenticate(user=self.studentUser)
    assign_role(self.studentUser, Student)

    response = self.client.get(get_courses_url)

    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertIn("is_enrolled", response.data[0])


  def test_get_all_courses_with_enrolled(self):
      get_courses_url = reverse("api:course-list-create-list")
      self.client.force_authenticate(user=self.studentUser)
      assign_role(self.studentUser, Student)

      CourseEnrollment.objects.create(
         user_id = self.studentUser,
         course_id = self.course1
      )
  
      response = self.client.get(get_courses_url)
      enrolledCourses = [course for course in response.data if course["is_enrolled"]]
  
      self.assertEqual(response.status_code, status.HTTP_200_OK)
      self.assertEqual(enrolledCourses[0]["id"], self.course1.id)
  
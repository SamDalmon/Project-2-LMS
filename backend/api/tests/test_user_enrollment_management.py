from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import Course

User = get_user_model()

class UserEnrollmentManagementTests(TestCase):

  def setup(self):

    self.seedCourses()

    self.existing_user = User.objects.create_user(
      username = "existingUser",
      email = "existing@example.com",
      password = self.password
    )

  def seedCourses(self):
    courseNames = [f"course {i}" for i in range(0, 5)]

    

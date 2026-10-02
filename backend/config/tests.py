from django.test import TestCase
from config.roles import createAvailablePermissions

class CreateAvailablePermissionsTests(TestCase):

  def test_valid_creation_success(self):
    """Test that the CreateAvailablePermissions function create a available_permissions dictionary correctly"""

    permission_matrix = {
      "user" : ["create"],
      "course" : ["enroll", "un_enroll"],
      "course_enrollment" : ["read", "delete", "update"],
    }

    expected_available_permissions = {
      "create_user": True,
      "enroll_course": True,
      "un_enroll_course": True,
      "read_course_enrollment": True,
      "delete_course_enrollment": True,
      "update_course_enrollment": True,
    }

    result = createAvailablePermissions(permission_matrix)

    self.assertEqual(result, expected_available_permissions)

  def test_empty_array_creation_success(self):
      """Test that the CreateAvailablePermissions function create a available_permissions dictionary correctly"""
  
      permission_matrix = {
        "user" : [],
        "course" : ["enroll", "un_enroll"],
        "course_enrollment" : [],
      }
  
      expected_available_permissions = {
        "enroll_course": True,
        "un_enroll_course": True,
      }
  
      result = createAvailablePermissions(permission_matrix)
  
      self.assertEqual(result, expected_available_permissions)

  def test_invalid_creation_failed(self):
        """Test that the CreateAvailablePermissions function create a available_permissions dictionary correctly"""
    
        permission_matrix = [
            "create_course",
            "delete course"
        ]
    
        with self.assertRaises(Exception):
          createAvailablePermissions(permission_matrix)
    
    
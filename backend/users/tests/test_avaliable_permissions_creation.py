from django.test import TestCase
from users.roles import createAvailablePermissions

class CreateAvailablePermissionsTests(TestCase):

  def test_valid_creation_success(self):
    """Test that the CreateAvailablePermissions function create a available_permissions dictionary correctly"""

    permission_matrix = {
      "user" : ["create"],
      "course" : ["enroll", "un_enroll"],
      "course_enrollment" : ["read", "delete", "update"],
    }

    expected_available_permissions = {
      "user_create": True,
      "course_enroll": True,
      "course_un_enroll": True,
      "course_enrollment_read": True,
      "course_enrollment_delete": True,
      "course_enrollment_update": True,
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
        "course_enroll": True,
        "course_un_enroll": True,
      }
  
      result = createAvailablePermissions(permission_matrix)
  
      self.assertEqual(result, expected_available_permissions)

  def test_invalid_creation_failed(self):
        """Test that the CreateAvailablePermissions function create a available_permissions dictionary correctly"""
    
        permission_matrix = [
            "course_create",
            "course_delete"
        ]
    
        with self.assertRaises(Exception):
          createAvailablePermissions(permission_matrix)

          

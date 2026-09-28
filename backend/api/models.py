from django.db import models

# For the different roles a user can have
class Role(models.Model):
  name = models.CharField(max_length=64, unique=True)

class User(models.Model):
  username = models.CharField(max_length=64, unique=True)
  password_hash = models.CharField(max_length=128)
  role_id = models.ForeignKey(Role, on_delete=models.CASCADE)

class Course(models.Model):
  name = models.CharField(max_length=64, unique=True)
  description = models.CharField(max_length=512)

# For the links showing users are enrolled in a course 
class CourseEnrollment(models.Model):
  user_id = models.ForeignKey(User, on_delete=models.CASCADE)
  course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

# For the different permissions there are in the system
class Permission(models.Model):
  permission_string = models.CharField(max_length=64, unique=True)
  description = models.CharField(max_length=512)

# For the links between user roles, and their permissions
class RolePermission(models.Model):
  role_id = models.ForeignKey(Role, on_delete=models.CASCADE)
  permission_id = models.ForeignKey(Permission, on_delete=models.CASCADE)

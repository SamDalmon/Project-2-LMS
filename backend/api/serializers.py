from rest_framework import serializers
from .models import Course, CourseEnrollment, Role, User

class CourseSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Course
    fields = ["url", "name", "description"]

class CourseEnrollmentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = CourseEnrollment
    fields = ["url", "course_id", "user_id"]

class RoleSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Role
    fields = ["url", "name"]

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ["url", "username", "password_hash", "role_id"]
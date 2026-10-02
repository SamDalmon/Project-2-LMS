from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Course, CourseEnrollment

class CourseSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Course
    fields = ["url", "name", "description"]

class CourseEnrollmentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = CourseEnrollment
    fields = ["url", "course_id", "user_id"]

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ["id", "username", "email", "first_name", "last_name"]

from rest_framework import serializers
from .models import Course, CourseEnrollment

class CourseSerializer(serializers.HyperlinkedModelSerializer):
  is_enrolled = serializers.BooleanField(read_only=True)
  class Meta:
    model = Course
    fields = ["id", "title", "description", "is_enrolled"]

class CourseEnrollmentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = CourseEnrollment
    fields = ["id", "course_id", "user_id"]



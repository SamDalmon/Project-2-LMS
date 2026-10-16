from rest_framework import serializers
from .models import Course, CourseEnrollment

class CourseSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Course
    fields = ["id", "name", "description"]

class CourseEnrollmentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = CourseEnrollment
    fields = ["id", "course_id", "user_id"]



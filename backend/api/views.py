from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import CourseEnrollment, Course

from .serializers import (
  CourseEnrollmentSerializer,
  CourseSerializer,
  UserSerializer,
)

# Course Views
class CourseListCreateView(generics.ListCreateAPIView):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer


# Course Enrollment Views
class CourseEnrollmentListCreateView(generics.ListCreateAPIView):
  queryset = CourseEnrollment.objects.all()
  serializer_class = CourseEnrollmentSerializer

class CourseEnrollmentDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = CourseEnrollment.objects.all()
  serializer_class = CourseEnrollmentSerializer


# User Views
class UserListCreateView(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [permissions.IsAuthenticated]

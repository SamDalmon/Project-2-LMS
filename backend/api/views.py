from rest_framework import generics, viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CourseEnrollment, Course
from django.shortcuts import get_object_or_404
from users.permissions import (
  CanSelfEnroll, 
  CanSelfUnEnroll,
  CanCreateCourses,
  CanDeleteCourses,
)

from .serializers import (
  CourseEnrollmentSerializer,
  CourseSerializer,
)

# Course Views
class CourseListCreateView(generics.ListCreateAPIView):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer
  base_permissions = [IsAuthenticated]
  
  action_permissions = {
    'POST': CanCreateCourses,
  }

  def get_permissions(self):
    permissions = list(self.base_permissions)

    extra_permissions = self.action_permissions.get(self.request.method)
    permissions.append(extra_permissions)

    return [permission() for permission in permissions]


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer
  base_permissions = [IsAuthenticated]
    
  action_permissions = {
    'UPDATE': CanCreateCourses,
    'DELETE': CanDeleteCourses,
  }

  def get_permissions(self):
    permissions = list(self.base_permissions)

    extra_permissions = self.action_permissions.get(self.request.method)
    permissions.append(extra_permissions)

    return [permission() for permission in permissions]
  

class EnrollmentActionViewSet(viewsets.GenericViewSet):
  queryset = CourseEnrollment.objects.all()
  serializer_class = CourseEnrollmentSerializer
  base_permissions = [IsAuthenticated]

  action_permissions = {
    'POST': CanSelfEnroll,
    'DELETE': CanSelfUnEnroll,
  }

  def get_permissions(self):
    permissions = list(self.base_permissions)

    extra_permissions = self.action_permissions.get(self.request.method)
    permissions.append(extra_permissions)

    return [permission() for permission in permissions]


  @action(
      detail=True,
      methods=["post"],
  ) 
  def enroll(self, request, pk=None):
    course = get_object_or_404(Course, pk=pk)
    student = request.user


    enrollment, created = CourseEnrollment.objects.get_or_create(
      user_id = student,
      course_id = course
    )

    if not created:
      return Response(
        {"detail": "You are already enrolled in this course"},
        status=status.HTTP_400_BAD_REQUEST
      )

    return Response(
      {"detail": "Successfully enrolled in the course"},
      status=status.HTTP_201_CREATED
    )


  @action(
        detail=True,
        methods=["delete"],
  ) 
  def unenroll(self, request, pk=None):
    course = get_object_or_404(Course, pk=pk)
    student = request.user

    enrollment = CourseEnrollment.objects.filter(
      user_id = student, 
      course_id = course
    )

    if enrollment.exists():
      enrollment.delete()
      return Response(
        {"detail": "Successfully unenrolled from the course."},
        status=status.HTTP_204_NO_CONTENT
      )

    return Response(
      {"detail": "Enrollment record not found."},
      status=status.HTTP_404_NOT_FOUND
    )


class EnrolledCoursesView(generics.ListAPIView):
  serializer_class = CourseSerializer
  permission_classes=[IsAuthenticated]

  def get_queryset(self):
    user = self.request.user

    return Course.objects.filter(courseenrollment__user_id=user)
  
  
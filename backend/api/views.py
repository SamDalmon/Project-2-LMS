from rest_framework import generics, viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import CourseEnrollment, Course
from users.permissions import CanSelfEnroll, CanSelfUnEnroll

from .serializers import (
  CourseEnrollmentSerializer,
  CourseSerializer,
)

# Course Views
class CourseListCreateView(generics.ListCreateAPIView):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer

class CourseEnrollmentViewSet(
  mixins.ListModelMixin,
  mixins.RetrieveModelMixin,
  mixins.DestroyModelMixin,
  viewsets.GenericViewSet,
):
  queryset = CourseEnrollment.objects.all()
  serializer_class = CourseEnrollmentSerializer

  @action(
      detail=True,
      methods=["post"],
      permission_classes=[IsAuthenticated, CanSelfEnroll],
  ) 
  def enroll(self, request, pk=None):
    course = self.get_object()
    student = request.user

    enrollment, created = CourseEnrollment.objects.get_or_create(
      user_id = student,
      course = course
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
        permission_classes=[IsAuthenticated, CanSelfUnEnroll],
  ) 
  def unenroll(self, request, pk=None):
    course = self.get_object()
    student = request.user

    enrollment = CourseEnrollment.objects.filter(
      user_id = student, 
      course = course
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
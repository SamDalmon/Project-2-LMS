from django.urls import path
from .views import (
  CourseEnrollmentListCreateView,
  CourseEnrollmentDetailView,
  CourseListCreateView,
  CourseDetailView,
)

urlpatterns = [
  path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
  path('courses/<int:pk>', CourseDetailView.as_view(), name='course-detail'),
  path('course-enrollments/', CourseEnrollmentListCreateView.as_view(), name='course-enrollment-list-create'),
  path('course-enrollments/<int:pk>', CourseEnrollmentDetailView.as_view(), name='course-enrollment-detail'),
]
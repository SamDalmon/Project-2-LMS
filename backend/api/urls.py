from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
  CourseListCreateView,
  CourseDetailView,
  CourseEnrollmentViewSet,
  EnrollmentActionViewSet,
  EnrolledCoursesView,
)

app_name = 'api'

router = DefaultRouter()

router.register(r'course-enrollments', CourseEnrollmentViewSet, basename='course-enrollments')
router.register(r'courses/<int:pk>/enrollments', EnrollmentActionViewSet, basename='enrollment-actions')

urlpatterns = [
  path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
  path('courses/<int:pk>', CourseDetailView.as_view(), name='course-detail'),
  path('me/courses', EnrolledCoursesView.as_view(), name='user-courses'),
  path('', include(router.urls)),
]
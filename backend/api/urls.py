from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
  CourseListCreateView,
  CourseDetailView,
  CourseEnrollmentViewSet
)

router = DefaultRouter()

router.register(r'course-enrollments', CourseEnrollmentViewSet, basename='course-enrollments')

urlpatterns = [
  path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
  path('courses/<int:pk>', CourseDetailView.as_view(), name='course-detail'),
  path('', include(router.urls))
]
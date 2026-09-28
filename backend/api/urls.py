from django.urls import path
from .views import (
  CourseEnrollmentListCreateView,
  CourseEnrollmentDetailView,
  CourseListCreateView,
  CourseDetailView,
  UserListCreateView,
  UserDetailView,
  RoleListCreateView,
  RoleDetailView,
  PermissionListView,
  PermissionRetrieveView,
  RolePermissionListView,
  RolePermissionRetrieveView
)

urlpatterns = [
  path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
  path('courses/<int:pk>', CourseDetailView.as_view(), name='course-detail'),
  path('course-enrollments/', CourseEnrollmentListCreateView.as_view(), name='course-enrollment-list-create'),
  path('course-enrollments/<int:pk>', CourseEnrollmentDetailView.as_view(), name='course-enrollment-detail'),
  path('users/', UserListCreateView.as_view(), name='user-list-create'),
  path('users/<int:pk>', UserDetailView.as_view(), name='user-detail'),
  path('roles/', RoleListCreateView.as_view(), name='role-list-create'),
  path('roles/<int:pk>', RoleDetailView.as_view(), name='role-detail'),
  path('permissions/', PermissionListView.as_view(), name='permission-list'),
  path('permissions/<int:pk>', PermissionRetrieveView.as_view(), name='permission-retrieve'),
  path('role-permissions/', RolePermissionListView.as_view(), name='role-permission-list'),
  path('role-permissions/<int:pk>', RolePermissionRetrieveView.as_view(), name='role-permission-retrieve'),
]
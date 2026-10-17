from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
  UserViewSet,
  UserPermissionsView,
  TeacherRegisterView, 
  StudentRegisterView,
  UserConstantsView,
)

app_name = 'users'

router = DefaultRouter()

router.register(r'', UserViewSet, basename='users')

urlpatterns = [
  path('auth/registration/teacher/', TeacherRegisterView.as_view(), name='teacher-register'),
  path('auth/registration/student/', StudentRegisterView.as_view(), name='student-register'),
  path('permissions/', UserPermissionsView.as_view(), name = 'user-permissions'),
  path('constants/', UserConstantsView.as_view(), name='user-constants'),
  path('auth/', include('dj_rest_auth.urls')),
  path('', include(router.urls)),
]
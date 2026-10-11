from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from .views import TeacherRegisterView, StudentRegisterView

app_name = 'users'

router = DefaultRouter()

router.register(r'', UserViewSet, basename='users')

urlpatterns = [
  path('', include(router.urls)),
  path('auth/registration/teacher/', TeacherRegisterView.as_view(), name='teacher-register'),
  path('auth/registration/student/', StudentRegisterView.as_view(), name='student-register'),
  path('auth/', include('dj_rest_auth.urls')),
]
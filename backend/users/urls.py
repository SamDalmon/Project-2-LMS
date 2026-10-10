from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from .views import TeacherRegisterView, StudentRegisterView

router = DefaultRouter()

router.register(r'', UserViewSet, basename='users')

urlpatterns = [
  path('', include(router.urls)),
  path('auth/registration/teacher/', TeacherRegisterView.as_view(), name='teacher'),
  path('auth/registration/student/', StudentRegisterView.as_view(), name='student'),
  path('auth/', include('dj_rest_auth.urls')),
]
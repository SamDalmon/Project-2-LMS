from django.urls import reverse_lazy
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.registration.views import RegisterView
from django.contrib.auth import get_user_model
from .permissions import CanManageUsers
from .serializers import UserSerializer, RegisterSerializer
from .forms import CustomUserCreationForm
from .roles import Teacher, Student

User = get_user_model()

class UserViewSet(
  mixins.CreateModelMixin,
  mixins.ListModelMixin,
  mixins.RetrieveModelMixin,
  mixins.DestroyModelMixin,
  viewsets.GenericViewSet,
):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes=[IsAuthenticated, CanManageUsers]

  # Create your views here.
  @action(
    detail=True,
    methods=["post"],
  )
  def approve(self, request, pk=None):
    user = self.get_object()

    if user.status != User.StatusChoices.PENDING:
      return Response(
        {"detail": "This user is not pending approval."},
        status=status.HTTP_400_BAD_REQUEST,
      )

    user.status = User.StatusChoices.ACTIVE
    user.save(update_fields=["status"])

    return Response(
      {"detail": "User approved"},
      status=status.HTTP_200_OK
    )

  @action(
    detail=True,
    methods=["post"],
  )
  def reject(self, request, pk=None):
    user = self.get_object()

    if user.status != User.StatusChoices.PENDING:
      return Response(
        {"detail": "This user is not pending approval."},
        status=status.HTTP_400_BAD_REQUEST,
      )

    user.status = User.StatusChoices.REJECTED
    user.save(update_fields=["status"])

    return Response(
      {"detail": "User rejected"},
      status=status.HTTP_200_OK
    )


class RoleRegisterView(RegisterView):
  serializer_class = RegisterSerializer
  form_class = CustomUserCreationForm
  success_url = reverse_lazy("login")

  def get_serializer_context(self):
      context = super().get_serializer_context()
      context["role"] = self.role
      return context

  def create(self, request, *args, **kwags):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = self.perform_create(serializer)

    headers = self.get_success_headers(serializer.data)
    response_data = self.get_response_data(user)

    response_data['user_id'] = user.id

    return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

class TeacherRegisterView(RoleRegisterView):
  role = Teacher

class StudentRegisterView(RoleRegisterView):
  role = Student
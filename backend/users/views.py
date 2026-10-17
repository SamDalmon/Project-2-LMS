from django.urls import reverse_lazy
from django.shortcuts import render
from rest_framework import status, viewsets, mixins, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from dj_rest_auth.registration.views import RegisterView
from rolepermissions.checkers import get_user_roles
from django.contrib.auth import get_user_model
from .permissions import CanManageUsers, IsActive
from .serializers import UserSerializer, RegisterSerializer
from .forms import CustomUserCreationForm
from .roles import Teacher, Student
from .constants import ModelAction, CRUD_ACTIONS, Role, Model

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
  permission_classes=[IsAuthenticated, IsActive, CanManageUsers]

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


class UserPermissionsView(generics.ListAPIView):
  permission_classes = [IsAuthenticated, IsActive]

  def get(self, request):
    user = request.user

    roles = [role.get_name() for role in get_user_roles(user)]

    permissions = set()
    for role in get_user_roles(user):
      permissions.update(role.permission_names_list())

    return Response({
      "username": user.username,
      "roles": roles,
      "permissions": permissions,
    })


class UserConstantsView(APIView):
  permission_classes = [IsAuthenticated, IsActive]

  def get(self, request, *args, **kwargs):
    constants_data = {
      "MODEL_ACTIONS": {model_action.name: model_action.value for model_action in ModelAction},
      "CRUD_ACTIONS": CRUD_ACTIONS,
      "ROLES": {role.name: role.value for role in Role},
      "MODELS": {model.name: model.value for model in Model}
    }
    return Response(constants_data, status=status.HTTP_200_OK)


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
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .constants import Role
from django.contrib.auth import get_user_model
from .permissions import CanManageUsers
from .serializers import UserSerializer

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

  # Create your views here.
  @action(
    detail=True,
    methods=["post"],
    permission_classes=[IsAuthenticated, CanManageUsers],
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
    permission_classes=[IsAuthenticated, CanManageUsers],
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
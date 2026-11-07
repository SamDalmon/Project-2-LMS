from django.contrib.auth import get_user_model
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .roles import Teacher, Student
from .models import CustomUser
from rolepermissions.roles import assign_role
from rolepermissions.checkers import get_user_roles
from rolepermissions.permissions import available_perm_status
from django.db import transaction

User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):

  role = serializers.SerializerMethodField()
  permissions = serializers.SerializerMethodField()
  class Meta:
    model = User
    fields = ["pk", "username", "email", "first_name", "last_name", "permissions", "role", "status", ]

  def get_role(self, user):
    user_role = get_user_roles(user)
    
    return user_role[0].get_name()

  def get_permissions(self, user):
    user_permissions = available_perm_status(user)

    granted_permissions = [ perm for perm, active in user_permissions.items() if active ]
    return granted_permissions


class ChangeStatusSerializer(serializers.Serializer):
  is_active = serializers.BooleanField(required=True)


class RegisterSerializer(RegisterSerializer):

  first_name = serializers.CharField(max_length=150, required=True)
  last_name = serializers.CharField(max_length=150, required=True)

  def get_cleaned_data(self):
    cleaned_data = super().get_cleaned_data()
    cleaned_data["first_name"] = self.validated_data.get("first_name", "")
    cleaned_data["last_name"] = self.validated_data.get("last_name", "")
    return cleaned_data

  @transaction.atomic
  def save(self, request):
    user = super().save(request)

    if self.context["role"] == Teacher:
      assign_role(user, Teacher)
      user.status = CustomUser.StatusChoices.PENDING
    else:
      assign_role(user, Student)

    user.first_name = self.cleaned_data.get("first_name")
    user.last_name = self.cleaned_data.get("last_name")
    user.save()

    return user

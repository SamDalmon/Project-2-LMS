from rest_framework.permissions import BasePermission
from rolepermissions.checkers import has_permission
from .roles import makePermissionKey
from .constants import (Model, ModelAction)


class CanManageUsers(BasePermission):
  message = "You must have Manage Users permission to perform this action"

  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.USER, ModelAction.MANAGE))


class CanSelfEnroll(BasePermission):
  message = "You don't have the permissions to enroll"

  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.USER, ModelAction.ENROLL))

class CanSelfUnEnroll(BasePermission):
  message = "You don't have the permissions to unenroll"

  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.USER, ModelAction.UNENROLL))
  

  
from rest_framework.permissions import BasePermission
from rolepermissions.checkers import has_permission
from .roles import makePermissionKey
from .constants import (Model, ModelAction)


class CanManageUsers(BasePermission):
  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.USER, ModelAction.MANAGE))


class CanSelfEnroll(BasePermission):
  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.USER, ModelAction.ENROLL))

class CanSelfUnEnroll(BasePermission):
  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.USER, ModelAction.UNENROLL))
  

  
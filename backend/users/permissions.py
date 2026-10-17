from rest_framework.permissions import BasePermission
from rolepermissions.checkers import has_permission
from .roles import makePermissionKey
from .constants import (Model, ModelAction)
from .models import CustomUser

class IsActive(BasePermission):
  message = "You must be approved by the admin before you can perform this action"

  def has_permission(self, request, view):
    return request.user.status == CustomUser.StatusChoices.ACTIVE

class CanManageUsers(BasePermission):
  message = "You must have Manage Users permission to perform this action"

  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.USER, ModelAction.MANAGE))


class CanSelfEnroll(BasePermission):
  message = "You don't have the permissions to enroll"

  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.COURSE, ModelAction.ENROLL))


class CanSelfUnEnroll(BasePermission):
  message = "You don't have the permissions to unenroll"

  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.COURSE, ModelAction.UNENROLL))


class CanCreateCourses(BasePermission):
  message = "You don't have the permissions to create a course"

  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.COURSE, ModelAction.CREATE))


class CanDeleteCourses(BasePermission):
  message = "You don't have the permissions to delete a course"

  def has_permission(self, request, view):
    return has_permission(request.user, makePermissionKey(Model.COURSE, ModelAction.DELETE))
  

  
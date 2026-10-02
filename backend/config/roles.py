from rolepermissions.roles import AbstractUserRole
from api.constants import ModelAction, CRUD_ACTIONS, Model

# create a availablePermissions dictionary from a permissions matrix
def createAvailablePermissions(permissionMatrix):
  availablePermissions = {}
  for modelStr, allowedActions in permissionMatrix.items():
    for allowedAction in allowedActions:
      availablePermissions[f"{allowedAction}_{modelStr}"] = True
  return availablePermissions

class Admin(AbstractUserRole):
  permission_matrix = {
    Model.USER : [*CRUD_ACTIONS],
    Model.COURSE : [*CRUD_ACTIONS],
    Model.COURSE_ENROLlMENT : [*CRUD_ACTIONS],
  }
  available_permissions = createAvailablePermissions(permission_matrix)

class Teacher(AbstractUserRole):
  permission_matrix = {
    Model.USER : [ModelAction.READ],
    Model.COURSE : [*CRUD_ACTIONS],
    Model.COURSE_ENROLlMENT : [ModelAction.READ, ModelAction.CREATE, ModelAction.DELETE],
  }
  available_permissions = createAvailablePermissions(permission_matrix)

class Student(AbstractUserRole):
  permission_matrix = {
    Model.USER : [],
    Model.COURSE : [ModelAction.READ, ModelAction.ENROLL, ModelAction.UNENROLL],
    Model.COURSE_ENROLlMENT : [ModelAction.READ],
  }
  available_permissions = createAvailablePermissions(permission_matrix)



  